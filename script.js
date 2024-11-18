$(document).ready(function() {
    $('#qrForm').on('submit', function(event) {
        event.preventDefault();
        const mapLink = $('#mapLink').val();

        // Ensure the URL starts with http or https
        if (!/^https?:\/\//i.test(mapLink)) {
            alert("Please enter a valid URL starting with 'http://' or 'https://'");
            return;
        }

        // Clear previous QR code
        $('#qrCodeContainer').empty();

        // Generate QR Code with increased size and spacing
        const qrCodeSize = 300; // Base size of the QR code
        const whiteSpaceSize = qrCodeSize * 4; // Total size including white space

        $('#qrCodeContainer').qrcode({
            text: mapLink,
            width: qrCodeSize, // Size of the QR code
            height: qrCodeSize,
            quiet: 20 // Increased quiet zone for better scannability
        });

        // Set the canvas size to include white space
        const canvas = $('#qrCodeContainer canvas')[0];
        const context = canvas.getContext('2d');
        const imgData = context.getImageData(0, 0, qrCodeSize, qrCodeSize);
        
        // Create a new canvas with more white space
        const newCanvas = document.createElement('canvas');
        newCanvas.width = whiteSpaceSize; // Total width including white space
        newCanvas.height = whiteSpaceSize; // Total height including white space
        const newContext = newCanvas.getContext ('2d');

        // Fill the new canvas with white
        newContext.fillStyle = 'white';
        newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);

        // Draw the QR code in the center of the new canvas
        newContext.putImageData(imgData, (whiteSpaceSize - qrCodeSize) / 2, (whiteSpaceSize - qrCodeSize) / 2);

        // Update the QR code container with the new canvas
        $('#qrCodeContainer').empty().append(newCanvas);

        // Show download link
        const downloadLink = $('#downloadLink');
        downloadLink.attr('href', newCanvas.toDataURL('image/png'));
        downloadLink.attr('download', 'qr_code.png');
        downloadLink.show();
    });
});