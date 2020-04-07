const { Sketch, Page, Artboard, SharedStyle } = require('sketch-constructor');
const Swatch = require('./swatch');

module.exports = {
    rowBuilder: function (destFolder, title, row) 
    {
        row.splice(0, 1); //remove the first null element
        const sketch = new Sketch();

        const page = new Page({
            name: title,
        });

        const artboard = new Artboard({
            name: title,
            frame: {
                width: row.length * 340 + 20,
                height: 350,
            },
        });

        row.forEach((item, i) => {
            const fill = i === 0;
            const swatch = new Swatch({
                fill: fill,
                label: item,
                value: '#1E88E5', //blue
                frame: {
                    x: i * 340 + 20,
                    y: 20,
                    width: 320,
                    height: 320,
                },
            });
            const layerStyle = SharedStyle.LayerStyle({
                name: item,
                fills: [
                    {
                        color: '#1E88E5',
                    },
                ],
            });
            sketch.addLayerStyle(layerStyle);
            artboard.addLayer(swatch);
        });

        page.addArtboard(artboard);
        sketch.addPage(page);
        sketch.build(destFolder + '/output.sketch').then(() => {
            console.log('Built!');
        });    }
}