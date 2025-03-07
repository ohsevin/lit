/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * @fileoverview
 *
 * Utilities for analyzing LitElement (and ReactiveElement) declarations.
 */

import ts from 'typescript';
import {LitElementDeclaration, AnalyzerInterface} from '../model.js';
import {isCustomElementDecorator} from './decorators.js';
import {getEvents} from './events.js';
import {getProperties} from './properties.js';

/**
 * Gets an analyzer LitElementDeclaration object from a ts.ClassDeclaration
 * (branded as LitClassDeclaration).
 */
export const getLitElementDeclaration = (
  node: LitClassDeclaration,
  analyzer: AnalyzerInterface
): LitElementDeclaration => {
  return new LitElementDeclaration({
    tagname: getTagName(node),
    // TODO(kschaaf): support anonymous class expressions when assigned to a const
    name: node.name?.text ?? '',
    node,
    reactiveProperties: getProperties(node, analyzer),
    events: getEvents(node, analyzer),
  });
};

/**
 * Returns true if this type represents the actual LitElement class.
 */
const _isLitElementClassDeclaration = (t: ts.BaseType) => {
  // TODO: should we memoize this for performance?
  const declarations = t.getSymbol()?.getDeclarations();
  if (declarations?.length !== 1) {
    return false;
  }
  const node = declarations[0];
  return (
    _isLitElementModule(node.getSourceFile()) &&
    ts.isClassDeclaration(node) &&
    node.name?.text === 'LitElement'
  );
};

const _isLitElementModule = (file: ts.SourceFile) => {
  return (
    file.fileName.endsWith('/node_modules/lit-element/lit-element.d.ts') ||
    // Handle case of running analyzer in symlinked monorepo
    file.fileName.endsWith('/packages/lit-element/lit-element.d.ts')
  );
};

/**
 * This type identifies a ClassDeclaration as one that inherits from LitElement.
 *
 * It lets isLitElement function as a type predicate that returns whether or
 * not its argument is a LitElement such that when it returns false TypeScript
 * doesn't infer that the argument is not a ClassDeclaration.
 */
export type LitClassDeclaration = ts.ClassDeclaration & {
  __litBrand: never;
};

/**
 * Returns true if `node` is a ClassLikeDeclaration that extends LitElement.
 */
export const isLitElement = (
  node: ts.Node,
  analyzer: AnalyzerInterface
): node is LitClassDeclaration => {
  if (!ts.isClassLike(node)) {
    return false;
  }
  const checker = analyzer.program.getTypeChecker();
  const type = checker.getTypeAtLocation(node) as ts.InterfaceType;
  const baseTypes = checker.getBaseTypes(type);
  for (const t of baseTypes) {
    if (_isLitElementClassDeclaration(t)) {
      return true;
    }
  }
  return false;
};

/**
 * Returns the tagname associated with a LitClassDeclaration
 * @param declaration
 * @returns
 */
export const getTagName = (declaration: LitClassDeclaration) => {
  let tagName: string | undefined = undefined;
  const customElementDecorator = declaration.decorators?.find(
    isCustomElementDecorator
  );
  if (
    customElementDecorator !== undefined &&
    customElementDecorator.expression.arguments.length === 1 &&
    ts.isStringLiteral(customElementDecorator.expression.arguments[0])
  ) {
    // Get tag from decorator: `@customElement('x-foo')`
    tagName = customElementDecorator.expression.arguments[0].text;
  } else {
    // Otherwise, look for imperative define in the form of:
    // `customElements.define('x-foo', XFoo);`
    declaration.parent.forEachChild((child) => {
      if (
        ts.isExpressionStatement(child) &&
        ts.isCallExpression(child.expression) &&
        ts.isPropertyAccessExpression(child.expression.expression) &&
        child.expression.arguments.length >= 2
      ) {
        const [tagNameArg, ctorArg] = child.expression.arguments;
        const {expression, name} = child.expression.expression;
        if (
          ts.isIdentifier(expression) &&
          expression.text === 'customElements' &&
          ts.isIdentifier(name) &&
          name.text === 'define' &&
          ts.isStringLiteralLike(tagNameArg) &&
          ts.isIdentifier(ctorArg) &&
          ctorArg.text === declaration.name?.text
        ) {
          tagName = tagNameArg.text;
        }
      }
    });
  }
  return tagName;
};
