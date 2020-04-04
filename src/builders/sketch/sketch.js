const { Sketch, Page, Artboard, SharedStyle } = require('sketch-constructor');
const Swatch = require('./swatch'); // custom component

module.exports = {
    build: function (distFolder, excelDataModel) {
        
        const colors = [
            {
                label: 'Red',
                value: '#E53935',
            },
            {
                label: 'Blue',
                value: '#1E88E5',
            },
            {
                label: 'Green',
                value: '#43A047',
            },
            {
                label: 'Orange',
                value: '#ff9900',
            },
            {
                label: 'Purple',
                value: '#9c27b0',
            },
        ];

        const sketch = new Sketch();

        const page = new Page({
            name: excelDataModel.title,
        });

        const artboard = new Artboard({
            name: excelDataModel.title,
            frame: {
                width: colors.length * 220 + 20,
                height: 190,
            },
        });

        // Iterate over the colors and put our custom Swatch component
        // on the artboard and add a layer style.
        colors.forEach((color, i) => {
            const swatch = new Swatch({
                ...color,
                frame: {
                    x: i * 220 + 20,
                    y: 20,
                    width: 200,
                    height: 170,
                },
            });
            const layerStyle = SharedStyle.LayerStyle({
                name: color.label,
                fills: [
                    {
                        color: color.value,
                    },
                ],
            });
            sketch.addLayerStyle(layerStyle);
            artboard.addLayer(swatch);
        });

        // Add the pages and artboards to the sketch object
        page.addArtboard(artboard);
        sketch.addPage(page);
        // sketch.addArtboard( page.getID(), artboard );

        sketch.build(distFolder + '/output.sketch').then(() => {
            console.log('Built!');
        });
    }
}