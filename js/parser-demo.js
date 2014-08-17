$(function() {
    // Input random address
    $('#lnk-random-address').on('click', function(e) {
        $('#txt-address').val(getRandomAddress());
        e.preventDefault();
    });

    $('#btn-parse').on('click', function() {
        var address = $('#txt-address').val();

        if (address == '') {
            address = getRandomAddress();
            $('#txt-address').val(address);
        }

        $.post('http://api.addresslabs.com/v1/parsed-address', {
            address: address
        }).done(function(data) {
            alert('Output JSON:\n\n' + JSON.stringify(data, null, 4));
        }).fail(function() {
            alert('Oops! Something went wrong.. Make sure you entered a valid address and try again.')
        });
    });
});

function getRandomAddress() {
    var addresses = [
        "10730 Main Street Fairfax Virginia 22030",
        "589 garfield street s tupelo ms 38801-2109",
        "5830 bright freeway south confederate ok 74533",
        "2082 Shady Lane Unit 5 Davidson Missouri 64728",
        "Golden Wagon Cove at Main St Ducktown Missouri 64954-7706"
    ];

    return addresses[Math.floor(Math.random() * addresses.length)];
}