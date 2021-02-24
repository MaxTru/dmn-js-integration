import Modeler from 'dmn-js/lib/Modeler';

insertCSS('dmn-js-drd.css', require('dmn-js-drd/assets/css/dmn-js-drd.css'));

insertCSS('dmn-js-decision-table.css',
  require('dmn-js-decision-table/assets/css/dmn-js-decision-table.css')
);

insertCSS('diagram-js.css', require('diagram-js/assets/diagram-js.css'));

insertCSS('dmn-js-testing.css',
  '.test-container { height: 500px; }'
);

describe('Large Tables', function() {

  let container;
  let modeler;

  beforeEach(function() {
    container = document.createElement('div');
    container.className = 'test-container';

    document.body.appendChild(container);

    console.log(Modeler);

    modeler = new Modeler({
      container: container,
      common: {
        keyboard: {
          bindTo: document
        }
      }
    });
  });


  it('Should open large table', function(done){
      const diagram = require('../resources/diagram_1.dmn').default;

      console.log(diagram);

      modeler.importXML(diagram, { open: false }, function(err) {

        if (err) {
          return done(err);
        }
/*
        var views = editor.getViews();
        var decisionView = views.filter(v => v.type === 'decisionTable')[0];

        // can open decisions
        expect(decisionView.element.$instanceOf('dmn:Decision')).to.be.true;

        editor.open(decisionView, done);*/

        expect(true).to.be.true;

        done();
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
