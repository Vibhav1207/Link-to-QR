$(document).ready(function() {
    $('#qrForm').on('submit', function(event) {
        event.preventDefault();
        const mapLink = $('#mapLink').val();
        
       
        $('#qrCodeContainer').empty();

       
        $('#qrCodeContainer').qrcode({
            text: mapLink,
            width: 200,
            height: 200
        });

       
        const canvas = $('#qrCodeContainer canvas')[0];
        const downloadLink = $('#downloadLink');
        downloadLink.attr('href', canvas.toDataURL('image/png'));
        downloadLink.attr('download', 'qr_code.png');
        downloadLink.show();
    });
});