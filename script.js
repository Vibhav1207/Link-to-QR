$(document).ready(function() {
    function generateQRCode(mapLink, color, useGradient = false, gradOptions = {}) {
        $('#qrCodeContainer').empty();

        // Generate QR code with a temporary canvas
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
            // Gradient fill
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

            // Draw gradient to temp canvas
            let gradCanvas = document.createElement('canvas');
            gradCanvas.width = canvas.width;
            gradCanvas.height = canvas.height;
            let gradCtx = gradCanvas.getContext('2d');
            gradCtx.fillStyle = grad;
            gradCtx.fillRect(0, 0, canvas.width, canvas.height);
            let gradData = gradCtx.getImageData(0, 0, canvas.width, canvas.height).data;

            // Apply gradient to QR code pixels
            for (let i = 0; i < data.length; i += 4) {
                if (data[i] < 64 && data[i+1] < 64 && data[i+2] < 64 && data[i+3] > 0) {
                    data[i] = gradData[i];
                    data[i+1] = gradData[i+1];
                    data[i+2] = gradData[i+2];
                }
            }
        } else {
            // Solid color QR code
            const rgb = hexToRgb(color);
            for (let i = 0; i < data.length; i += 4) {
                if (data[i] < 64 && data[i+1] < 64 && data[i+2] < 64 && data[i+3] > 0) {
                    data[i] = rgb.r;
                    data[i+1] = rgb.g;
                    data[i+2] = rgb.b;
                }
            }
        }
        context.putImageData(imageData, 0, 0);

        // Draw neon border and logo
        const logo = new Image();
        const logoSize = 120;
        logo.onload = function() {
            const x = (canvas.width - logoSize) / 2;
            const y = (canvas.height - logoSize) / 2;


            context.drawImage(logo, x, y, logoSize, logoSize);
            $('#qrCodeContainer').empty().append(canvas);

            const downloadLink = $('#downloadLink');
            downloadLink.attr('href', canvas.toDataURL('image/png'));
            downloadLink.attr('download', 'qr_code_with_logo.png');
            downloadLink.show();
        };
        logo.src = 'SIH.png';
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

    // Solid color QR code
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

    // Live update for solid color QR code
    $('#colorPicker').on('input', function() {
        const mapLink = $('#mapLink').val();
        if (/^https?:\/\//i.test(mapLink)) {
            generateQRCode(mapLink, $(this).val(), false);
        }
    });

    // Gradient QR code
    $('#applyGradient').on('click', function() {
        const mapLink = $('#mapLink').val();
        if (!/^https?:\/\//i.test(mapLink)) {
            alert("Please enter a valid URL starting with 'http://' or 'https://'");
            return;
        }
        const color1 = $('#gradientColor1').val();
        const color2 = $('#gradientColor2').val();
        const direction = $('#gradientDirection').val();

        generateQRCode(mapLink, null, true, {
            color1: color1,
            color2: color2,
            direction: direction
        });
    });

    // Link shortener logic using is.gd (opens in new tab for reliability)
    $('#shortenBtn').on('click', function() {
        const originalUrl = $('#shortenInput').val();
        if (!/^https?:\/\//i.test(originalUrl)) {
            alert("Please enter a valid URL starting with 'http://' or 'https://'");
            return;
        }
        window.open('https://is.gd/create.php?format=simple&url=' + encodeURIComponent(originalUrl), '_blank');
    });

    // Optional: When clicking the short link field, copy to clipboard
    $('#shortLink').on('click', function() {
        if (this.value) {
            this.select();
            document.execCommand('copy');
        }
    });
});