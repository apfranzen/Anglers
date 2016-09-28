(function () {
  // console.log('sanity check!');

//select river basin, and this auto populates the sites dropdown

  $('[name="river-basin"]').on('change', function() {
    var riverName = $('[name="river-basin"]').val();
    $.ajax({
      type: 'GET',
      url: '/sites?river='+riverName,
      success: function(data) {
        let dropdown = $('#site-dropdown');
        dropdown.empty();
        $.each(data.sites, function(k,v) {
          var site = v["site_name"]
          $('#site-dropdown').append($('<option></option>')
          .text(JSON.stringify(site)));
        });
      },
      error: function(data) {
        return error;
      }
    });
  });
})();

$(document).ready(function() {
  addGoogleMapsScript();
});

function addGoogleMapsScript () {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.src  = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDzaOBIjmRJeiSfhiXhPC4Wo4syHsQG_hc&callback=initMap&libraries=geometry';
  $('head').append(s);
}

function newMap (lat, lng, map) {
  console.log('newMap');
  myLatLng = new google.maps.LatLng(lat, lng);
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myLatLng,
    mapTypeId: 'terrain'
  });
  return map;
}

function initMap (lat, lng) {
  console.log('initMap');
  var lat = $(".geo").attr("data-lat")
  var lng = $(".geo").attr("data-lon")
  var myLatLng = new google.maps.LatLng(lat, lng);
  var map = newMap(lat,lng);
  var marker = newMarker(myLatLng, map,'Station', greenMarker);
}

function newMarker(pos,map,title,icon) {
  var marker = new google.maps.Marker({
    position: pos,
    map: map,
    title: title,
    icon: icon
  });
  // distanceAway(pos, map, title, numBikesAvail);

  return marker;
}
var greenMarker = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
var blueMarker = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';

// --- Sign Up Form Validation --- \\

$('#sign-up-form').validate({
  // Validation rules
  rules: {
    username: {
      required: true,
      minlength: 6
    },
    first_name: {
      required: true,
      minlength: 3,
      firstletter: true
    },
    last_name: {
      required: true,
      minlength: 3,
      firstletter: true
    },
    email: {
      email: true,
      required: true
    },
    password: {
      required: true,
      minlength: 6
    }
  },

  // Validation error messages
  messages: {
    username: {
      required: 'Username field cannot be blank!',
      minlength: 'Your username must be at least 6 characters long'
    },
    first_name: {
      required: 'First Name field cannot be blank',
      minlength: 'First Name must be at least three characters',
      firstletter: 'First letter must be capitalized'
    },
    last_name: {
      required: 'Last Name field cannot be blank!',
      minlength: 'Last Name must be at least three characters',
      firstletter: 'First letter must be capitalized'
    },
    email: {
      required: 'Please enter a valid email address'
    },
    password: {
      required: 'Please enter a valid password',
      minlength: 'Password must be at least 6 characters'
    }
  },

  submitHandler: function(form) {
    form.submit();
  }
});

// Adds the method to check if the first letter is capitalized
$.validator.addMethod('firstletter', function(value, element) {
  return this.optional(element) || /^[A-Z]/.test(value);
});
