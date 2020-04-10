const { Sketch, Page, Artboard, SharedStyle } = require('sketch-constructor');
const Swatch = require('./swatch');

module.exports = {
    rowBuilder: function (destFolder, excelData) 
    {
        excelData.data.splice(0, 1);
        data = excelData.data;
        rowLength = data[0].length;
        columnLength = data.length;
        const sketch = new Sketch();
        const page = new Page(
            {
                name: excelData.title,
            });
        const artboard = new Artboard(
            {
                name: excelData.title,
                frame: {
                    width: rowLength * 340 + 20,
                    height: columnLength * 340 + 20,
                },
            });

        data.forEach((row, j) => 
        {
            row.splice(0,1);
            row.forEach((item, i) =>
            {
                const fill = i === 0;
                const swatch = new Swatch({
                    fill: fill,
                    label: item,
                    value: '#1E88E5', //blue
                    frame: {
                        x: i * 340 + 20,
                        y: j * 340 + 20,
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
        });

        page.addArtboard(artboard);
        sketch.addPage(page);
        sketch.build(destFolder + '/output.sketch').then(() => {
            console.log('Built!');
        });    }
}