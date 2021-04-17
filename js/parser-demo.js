$(function() {
    // Input random address
    $('#lnk-random-address').on('click', function(e) {
        $('#txt-address').val(getRandomAddress());
        e.preventDefault();
    });

    $('#lnk-parse').on('click', function() {
        var address = $('#txt-address').val();

        if (address == '') {
            address = getRandomAddress();
            $('#txt-address').val(address);
        }

        $('#tbl-address-elements > tbody > tr > td:nth-child(2)').text('');
        $('#formatted-line-1').text('');
        $('#formatted-line-2').text('');
        $('#raw-response').text('');

        $.post('https://address-parser.herokuapp.com/v1/parsed-address', {
            address: address
        }).done(function(data) {
            $('.parsed-address-data').show();
            $('.parsed-address-error').hide();
            $('#formatted-line-1').text(data.delivery.address_line);
            $('#formatted-line-2').text(data.delivery.last_line);
            $('#raw-response').text(JSON.stringify(data, null, 4));
            setAddressElements(data);
        }).fail(function() {
            $('.parsed-address-data').hide();
            $('.parsed-address-error').show();
        });
    });
});

function getRandomAddress() {
    var addresses = [
        "10 South Main Street Unit 3 Fairfax Virginia 22030",
        "5897 garfield street s tupelo ms 38801-2109",
        "58 bright freeway south apartment 5 confederate ok 74533",
        "12 Shady Lane Suite 5 Davidson Missouri 64728",
        "Golden Wagon Cove at Main St Ducktown Missouri 64954-7706"
    ];

    return addresses[Math.floor(Math.random() * addresses.length)];
}

function setAddressElements(data) {
    for (var element in data) {
        if (data.hasOwnProperty(element)) {
            if (typeof(data[element]) === 'object') {
                setAddressElements(data[element]);
            } else {
                $('#' + element).text(data[element]);
            }
        }
    }
}
