/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import 'source-map-support/register.js';
import {suite} from 'uvu';
// eslint-disable-next-line import/extensions
import * as assert from 'uvu/assert';
import {fileURLToPath} from 'url';
import {getSourceFilename, languages} from '../utils.js';

import {
  createPackageAnalyzer,
  Analyzer,
  AbsolutePath,
  LitElementDeclaration,
} from '../../index.js';

for (const lang of languages) {
  const test = suite<{
    analyzer: Analyzer;
    packagePath: AbsolutePath;
    element: LitElementDeclaration;
  }>(`LitElement event tests (${lang})`);

  test.before((ctx) => {
    try {
      const packagePath = fileURLToPath(
        new URL(`../../test-files/${lang}/events`, import.meta.url).href
      ) as AbsolutePath;
      const analyzer = createPackageAnalyzer(packagePath);

      const result = analyzer.getPackage();
      const elementAModule = result.modules.find(
        (m) => m.sourcePath === getSourceFilename('element-a', lang)
      );
      const element = elementAModule!.declarations.filter((d) =>
        d.isLitElementDeclaration()
      )[0] as LitElementDeclaration;

      ctx.packagePath = packagePath;
      ctx.analyzer = analyzer;
      ctx.element = element;
    } catch (error) {
      // Uvu has a bug where it silently ignores failures in before and after,
      // see https://github.com/lukeed/uvu/issues/191.
      console.error('uvu before error', error);
      process.exit(1);
    }
  });

  test('Correct number of events found', ({element}) => {
    assert.equal(element.events.size, 10);
  });

  test('Just event name', ({element}) => {
    const event = element.events.get('event');
    assert.ok(event);
    assert.equal(event.name, 'event');
    assert.equal(event.description, undefined);
  });

  test('Event with description', ({element}) => {
    const event = element.events.get('event-two');
    assert.ok(event);
    assert.equal(event.name, 'event-two');
    assert.equal(event.description, 'This is an event');
  });

  test('Event with dash-separated description', ({element}) => {
    const event = element.events.get('event-three');
    assert.ok(event);
    assert.equal(event.name, 'event-three');
    assert.equal(event.description, 'This is another event');
  });

  test('Event with type', ({element}) => {
    const event = element.events.get('typed-event');
    assert.ok(event);
    assert.equal(event.name, 'typed-event');
    assert.equal(event.type?.text, 'MouseEvent');
    assert.equal(event.description, undefined);
    assert.equal(event.type?.references[0].name, 'MouseEvent');
    assert.equal(event.type?.references[0].isGlobal, true);
  });

  test('Event with type and description', ({element}) => {
    const event = element.events.get('typed-event-two');
    assert.ok(event);
    assert.equal(event.name, 'typed-event-two');
    assert.equal(event.type?.text, 'MouseEvent');
    assert.equal(event.description, 'This is a typed event');
  });

  test('Event with type and dash-separated description', ({element}) => {
    const event = element.events.get('typed-event-three');
    assert.ok(event);
    assert.equal(event.name, 'typed-event-three');
    assert.equal(event.type?.text, 'MouseEvent');
    assert.equal(event.description, 'This is another typed event');
  });

  test('Event with local custom event type', ({element}) => {
    const event = element.events.get('local-custom-event');
    assert.ok(event);
    assert.equal(event.type?.text, 'LocalCustomEvent');
    assert.equal(
      event.type?.references[0].package,
      '@lit-internal/test-events'
    );
    assert.equal(event.type?.references[0].module, 'element-a.js');
    assert.equal(event.type?.references[0].name, 'LocalCustomEvent');
  });

  test('Event with imported custom event type', ({element}) => {
    const event = element.events.get('external-custom-event');
    assert.ok(event);
    assert.equal(event.type?.text, 'ExternalCustomEvent');
    assert.equal(
      event.type?.references[0].package,
      '@lit-internal/test-events'
    );
    assert.equal(event.type?.references[0].module, 'custom-event.js');
    assert.equal(event.type?.references[0].name, 'ExternalCustomEvent');
  });

  test('Event with generic custom event type', ({element}) => {
    const event = element.events.get('generic-custom-event');
    assert.ok(event);
    assert.equal(event.type?.text, 'CustomEvent<ExternalClass>');
    assert.equal(event.type?.references[0].name, 'CustomEvent');
    assert.equal(event.type?.references[0].isGlobal, true);
    assert.equal(
      event.type?.references[1].package,
      '@lit-internal/test-events'
    );
    assert.equal(event.type?.references[1].module, 'custom-event.js');
    assert.equal(event.type?.references[1].name, 'ExternalClass');
  });

  test('Event with custom event type with inline detail', ({element}) => {
    const event = element.events.get('inline-detail-custom-event');
    assert.ok(event);
    assert.equal(
      event.type?.text,
      'CustomEvent<{ event: MouseEvent; more: { impl: ExternalClass; }; }>'
    );
    assert.equal(event.type?.references[0].name, 'CustomEvent');
    assert.equal(event.type?.references[0].isGlobal, true);
    assert.equal(event.type?.references[1].name, 'MouseEvent');
    assert.equal(event.type?.references[1].isGlobal, true);
    assert.equal(
      event.type?.references[2].package,
      '@lit-internal/test-events'
    );
    assert.equal(event.type?.references[2].module, 'custom-event.js');
    assert.equal(event.type?.references[2].name, 'ExternalClass');
  });

  test.run();
}
