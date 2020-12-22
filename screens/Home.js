import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  initialCurrentLocation,
  categoryData,
  affordable,
  fairPrice,
  expensive,
  restaurantData,
} from '../data';

import {COLORS, icons, images, SIZES, FONTS} from '../constants';

const Home = () => {
  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0]);
  const [restaurants, setRestaurants] = React.useState(restaurantData);
  const [currentLocation, setCurrentLocation] = React.useState(
    initialCurrentLocation,
  );
  useEffect(() => {
    onSelectCategory(selectedCategory);
  }, []);

  const getCategoryNameById = (id) => {
    let category = categories.filter((a) => a.id === id);
    if (category.length > 0) {
      return category[0].name;
    }
    return '';
  };

  const onSelectCategory = (category) => {
    let restaurantList = restaurantData.filter((a) =>
      a.categories.includes(category.id),
    );
    setRestaurants(restaurantList);
    setSelectedCategory(category);
  };

  /************  HEADER  ****************/
  function renderHeader() {
    return (
      <View style={{flexDirection: 'row', height: 50}}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: COLORS.lightGray3,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3}}> {currentLocation.streetName}</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  /************   CATEGORIES  ****************/

  function renderCategoriesItem({item}) {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id === item.id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item)}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                selectedCategory?.id === item.id
                  ? COLORS.white
                  : COLORS.lightGray,
            }}>
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>
          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?.id === item.id ? COLORS.white : COLORS.black,
              ...FONTS.body5,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  function renderMainCategories() {
    return (
      <View style={{padding: SIZES.padding * 2}}>
        <Text style={{...FONTS.h2}}>Main</Text>
        <Text style={{...FONTS.h2}}>Categories</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderCategoriesItem}
          contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
        />
      </View>
    );
  }

  /*********** RESTAURANT LIST ***************/

  function renderRestaurantItem({item}) {
    return (
      <TouchableOpacity
        style={{marginBottom: SIZES.padding * 2}}
        activeOpacity={0.7}>
        {/**Image */}
        <View style={{marginBottom: SIZES.padding}}>
          <Image
            source={item.photo}
            resizeMode="cover"
            style={{
              width: '100%',
              height: 200,

              borderRadius: SIZES.radius,
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              height: 50,
              width: SIZES.width * 0.3,
              backgroundColor: COLORS.white,
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius * 0.95,
              alignItems: 'center',
              justifyContent: 'center',
              ...styles.shadow,
            }}>
            <Text style={{...FONTS.h4}}>{item.duration}</Text>
          </View>
        </View>
        {/** Restaurant Info **/}
        <Text
          style={{
            ...FONTS.body3,
          }}>
          {item.name}
        </Text>
        <View
          style={{
            marginTop: SIZES.padding,
            marginBottom: SIZES.padding,
            flexDirection: 'row',
          }}>
          {/** Rating **/}
          <Image
            source={icons.star}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.primary,
              marginRight: 10,
            }}
          />
          <Text
            style={{
              ...FONTS.body3,
            }}>
            {item.rating}
          </Text>

          {/**  **/}
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
            }}>
            {item.categories.map((categoryId) => (
              <View
                style={{
                  flexDirection: 'row',
                }}
                key={categoryId}>
                <Text
                  style={{
                    ...FONTS.body3,
                  }}>
                  {getCategoryNameById(categoryId)}
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.darkgray,
                  }}>
                  .
                </Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  function renderRestaurantList() {
    return (
      <FlatList
        data={restaurants}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderRestaurantItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 20,
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderRestaurantList()}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
});
