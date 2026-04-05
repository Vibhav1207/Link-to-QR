$(document).ready(function() {
    function generateQRCode(mapLink, color, useGradient = false, gradOptions = {}) {
        $('#qrCodeContainer').empty();

        let tempDiv = $('<div>');
        tempDiv.qrcode({
            text: mapLink,
            width: 300,
            height: 300,
            quiet: 10
        });

        const canvas = tempDiv.find('canvas')[0];
        const context = canvas.getContext('2d');
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        if (useGradient) {
            let grad;
            if (gradOptions.direction === 'horizontal') {
                grad = context.createLinearGradient(0, 0, canvas.width, 0);
            } else if (gradOptions.direction === 'vertical') {
                grad = context.createLinearGradient(0, 0, 0, canvas.height);
            } else {
                grad = context.createLinearGradient(0, 0, canvas.width, canvas.height);
            }
            grad.addColorStop(0, gradOptions.color1);
            grad.addColorStop(1, gradOptions.color2);

            let gradCanvas = document.createElement('canvas');
            gradCanvas.width = canvas.width;
            gradCanvas.height = canvas.height;
            let gradCtx = gradCanvas.getContext('2d');
            gradCtx.fillStyle = grad;
            gradCtx.fillRect(0, 0, canvas.width, canvas.height);
            let gradData = gradCtx.getImageData(0, 0, canvas.width, canvas.height).data;

            for (let i = 0; i < data.length; i += 4) {
                if (data[i] < 64 && data[i + 1] < 64 && data[i + 2] < 64 && data[i + 3] > 0) {
                    data[i] = gradData[i];
                    data[i + 1] = gradData[i + 1];
                    data[i + 2] = gradData[i + 2];
                }
            }
        } else {
            const rgb = hexToRgb(color);
            for (let i = 0; i < data.length; i += 4) {
                if (data[i] < 64 && data[i + 1] < 64 && data[i + 2] < 64 && data[i + 3] > 0) {
                    data[i] = rgb.r;
                    data[i + 1] = rgb.g;
                    data[i + 2] = rgb.b;
                }
            }
        }

        context.putImageData(imageData, 0, 0);
        $('#qrCodeContainer').empty().append(canvas);

        const downloadLink = $('#downloadLink');
        downloadLink.attr('href', canvas.toDataURL('image/png'));
        downloadLink.attr('download', 'qr_code_no_logo.png');
        downloadLink.show();
    }

    function hexToRgb(hex) {
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) {
            hex = hex.split('').map(x => x + x).join('');
        }
        const num = parseInt(hex, 16);
        return {
            r: (num >> 16) & 255,
            g: (num >> 8) & 255,
            b: num & 255
        };
    }

    $('#qrForm').on('submit', function(event) {
        event.preventDefault();
        const mapLink = $('#mapLink').val();
        const color = $('#colorPicker').val();

        if (!/^https?:\/\//i.test(mapLink)) {
            alert("Please enter a valid URL starting with 'http://' or 'https://'");
            return;
        }

        generateQRCode(mapLink, color, false);
    });

    $('#colorPicker').on('input', function() {
        const mapLink = $('#mapLink').val();
        if (/^https?:\/\//i.test(mapLink)) {
            generateQRCode(mapLink, $(this).val(), false);
        }
    });

    $('#applyGradient').on('click', function() {
        const mapLink = $('#mapLink').val();
        if (!/^https?:\/\//i.test(mapLink)) {
            alert("Please enter a valid URL starting with 'http://' or 'https://'");
            return;
        }

        generateQRCode(mapLink, null, true, {
            color1: $('#gradientColor1').val(),
            color2: $('#gradientColor2').val(),
            direction: $('#gradientDirection').val()
        });
    });
});
