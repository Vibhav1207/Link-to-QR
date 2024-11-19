$(document).ready(function() {
    $('#qrForm').on('submit', function(event) {
        event.preventDefault();
        const mapLink = $('#mapLink').val();

       
        if (!/^https?:\/\//i.test(mapLink)) {
            alert("Please enter a valid URL starting with 'http://' or 'https://'");
            return;
        }

      
        $('#qrCodeContainer').empty();

       
        $('#qrCodeContainer').qrcode({
            text: mapLink,
            width: 300, // Size of the QR code
            height: 300,
            quiet: 10 
        });

        
        const canvas = $('#qrCodeContainer canvas')[0];
        const context = canvas.getContext('2d');

        
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
            downloadLink .show();
        };

        logo.src = 'Uday.png';
    });
}); 

