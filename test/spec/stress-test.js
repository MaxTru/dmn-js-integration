import Modeler from 'dmn-js/lib/Modeler';

import { query } from 'min-dom';

insertCSS('dmn-js-drd.css', require('dmn-js-drd/assets/css/dmn-js-drd.css'));

insertCSS('dmn-js-shared.css', require('dmn-js-shared/assets/css/dmn-js-shared.css'));

insertCSS('dmn-js-decision-table.css',
  require('dmn-js-decision-table/assets/css/dmn-js-decision-table.css')
);

insertCSS('dmn-js-decision-table-controls.css',
  require('dmn-js-decision-table/assets/css/dmn-js-decision-table-controls.css')
);

insertCSS('diagram-js.css', require('diagram-js/assets/diagram-js.css'));

insertCSS('dmn-js-testing.css',
  '.test-container { height: 500px; }'
);

describe('Stress test', function() {

  let container;
  let modeler;

  beforeEach(function() {
    container = document.createElement('div');
    container.className = 'test-container';

    document.body.appendChild(container);

    modeler = new Modeler({
      container: container,
      common: {
        keyboard: {
          bindTo: document
        }
      }
    });
  });


  afterEach(function() {
    if (modeler) {
      modeler.destroy();

      modeler = null;
    }

    document.body.removeChild(container);
  });


  describe('open DRD view', function() {

    it('should show 1 table with 10.000 cells', function(done) {
      const diagram = require('../resources/1Table1000Rows10Cols.dmn');

      modeler.importXML(diagram, { open: false }, function(err) {

        if (err) {
          return done(err);
        }

        const views = modeler.getViews();
        const decisionView = views.filter(v => v.type === 'drd')[0];

        modeler.open(decisionView, done);

        done();
      });

    });


    it('should show 3 tables with 10.000 cells', function(done) {
      const diagram = require('../resources/3Tables1000Rows10Cols.dmn');

      modeler.importXML(diagram, { open: false }, function(err) {

        if (err) {
          return done(err);
        }

        const views = modeler.getViews();
        const decisionView = views.filter(v => v.type === 'drd')[0];

        modeler.open(decisionView, done);

        done();
      });

    });


    it('should show 1 table with 30.000 cells', function(done) {
      const diagram = require('../resources/1Table3000Rows10Cols.dmn');

      modeler.importXML(diagram, { open: false }, function(err) {

        if (err) {
          return done(err);
        }

        const views = modeler.getViews();
        const decisionView = views.filter(v => v.type === 'drd')[0];

        modeler.open(decisionView, done);

        done();
      });

    });

  });


  describe('open Decision table view', function() {

    it('should show 10.000 cells in drd with 10.000 cells', function(done) {
      const diagram = require('../resources/1Table1000Rows10Cols.dmn');

      modeler.importXML(diagram, { open: false }, function(err) {

        if (err) {
          return done(err);
        }

        const views = modeler.getViews();
        const decisionView = views.filter(v => v.type === 'decisionTable')[0];

        modeler.open(decisionView, done);

        done();
      });

    });


    it('should show 10.000 cells in drd with 30.000 cells', function(done) {
      const diagram = require('../resources/3Tables1000Rows10Cols.dmn');

      modeler.importXML(diagram, { open: false }, function(err) {

        if (err) {
          return done(err);
        }

        const views = modeler.getViews();
        const decisionView = views.filter(v => v.type === 'decisionTable')[0];

        modeler.open(decisionView, done);

        done();
      });

    });


    it('should show 30.000 cells in drd with 30.000 cells', function(done) {
      const diagram = require('../resources/1Table3000Rows10Cols.dmn');

      modeler.importXML(diagram, { open: false }, function(err) {

        if (err) {
          return done(err);
        }

        const views = modeler.getViews();
        const decisionView = views.filter(v => v.type === 'decisionTable')[0];

        modeler.open(decisionView, done);

        done();
      });

    });

  });


  describe('interact with decision table', function() {

    describe('10.000 cells', function() {

      it('should interact', function(done) {

        const diagram = require('../resources/1Table1000Rows10Cols.dmn');

        modeler.importXML(diagram, { open: false }, function(err) {

          const views = modeler.getViews();
          const decisionView = views.filter(v => v.type === 'decisionTable')[0];

          modeler.open(decisionView, done);

          // when
          const cell = query('[data-element-id="InputEntry64"]', container);
          triggerMouseEvent(cell, 'click');

          const overlayButton = query('.simple-mode-button', container);
          triggerMouseEvent(overlayButton, 'click');

          const editOverlay = query('.context-menu', container);

          // then
          expect(editOverlay).to.exist;

          done();
        });

      });

    });


    describe('30.000 cells', function() {

      it('should interact', function(done) {

        const diagram = require('../resources/1Table3000Rows10Cols.dmn');

        modeler.importXML(diagram, { open: false }, function(err) {

          const views = modeler.getViews();
          const decisionView = views.filter(v => v.type === 'decisionTable')[0];

          modeler.open(decisionView, done);

          // when
          const cell = query('[data-element-id="InputEntry64"]', container);
          triggerMouseEvent(cell, 'click');

          const overlayButton = query('.simple-mode-button', container);
          triggerMouseEvent(overlayButton, 'click');

          const editOverlay = query('.context-menu', container);

          // then
          expect(editOverlay).to.exist;

          done();
        });

      });

    });

  });

});

// helper ////////////////////

function insertCSS(name, css) {
  if (document.querySelector('[data-css-file="' + name + '"]')) {
    return;
  }

  const head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
  style.setAttribute('data-css-file', name);

  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
}

function triggerMouseEvent(node, eventType) {
  const clickEvent = document.createEvent ('MouseEvents');
  clickEvent.initEvent(eventType, true, true);
  node.dispatchEvent(clickEvent);
}
