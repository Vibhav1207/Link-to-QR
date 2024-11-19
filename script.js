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

        // Generate QR Code
        $('#qrCodeContainer').qrcode({
            text: mapLink,
            width: 300, // Size of the QR code
            height: 300,
            quiet: 10 // Quiet zone for better scannability
        });

        // Get the canvas of the QR code
        const canvas = $('#qrCodeContainer canvas')[0];
        const context = canvas.getContext('2d');

        // Load the fixed logo
        const logo = new Image();
        const logoSize = 120; // Size of the logo

        logo.onload = function() {
            // Draw the logo in the center of the QR code
            const x = (canvas.width - logoSize) / 2;
            const y = (canvas.height - logoSize) / 2;
            context.drawImage(logo, x, y, logoSize, logoSize);
            
            // Update the QR code container with the modified canvas
            $('#qrCodeContainer').empty().append(canvas);

            // Show download link
            const downloadLink = $('#downloadLink');
            downloadLink.attr('href', canvas.toDataURL('image/png'));
            downloadLink.attr('download', 'qr_code_with_logo.png');
            downloadLink .show();
        };

        logo.src = 'Uday.png';
    });
}); 

