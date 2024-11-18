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
        $('#qrCodeContainer').qrcode({
            text: mapLink,
            width: 300, // Increased size for better scanning
            height: 300,
            quiet: 10 // Increased quiet zone for better scannability
        });

        // Show download link
        const canvas = $('#qrCodeContainer canvas')[0];
        const downloadLink = $('#downloadLink');
        downloadLink.attr('href', canvas.toDataURL('image/png'));
        downloadLink.attr('download', 'qr_code.png');
        downloadLink.show();
    });
});