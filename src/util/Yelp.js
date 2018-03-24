const apiKey = 'Z9rI1FVoK-5ii_1uEW3FuKWRWMjMA8pSrRni7_I6XCN2Xqhs-5on0HSBo3X02hz8yoI6n093i1nJrldAHtC0p86U6nAuHsPcG3o2jflvPWM2oXtjkKPjh-z4NzyYWnYx';

const Yelp = {
  search(term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => ({
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count,
          url: business.url,
          map: 'https://www.google.com/maps/@' + business.coordinates.latitude + ',' + business.coordinates.longitude,
          googleMap: 'https://www.google.com/maps/place/' + business.location.address1 + '+' + business.location.city + '+' + business.location.state + '+' + business.location.zip_code
        }));
      }
    });
  }
};

export default Yelp;
