$(document).ready(function() {
    $('#qrForm').on('submit', function(event) {
        event.preventDefault();
        const mapLink = $('#mapLink').val();
        
        // Clear previous QR code
        $('#qrCodeContainer').empty();

        // Generate QR Code
        $('#qrCodeContainer').qrcode({
            text: mapLink,
            width: 200, // Increased size for better scanning
            height: 200
        });

        // Show download link
        const canvas = $('#qrCodeContainer canvas')[0];
        const downloadLink = $('#downloadLink');
        downloadLink.attr('href', canvas.toDataURL('image/png'));
        downloadLink.attr('download', 'qr_code.png');
        downloadLink.show();
    });
});