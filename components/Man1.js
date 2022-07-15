import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, Component, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import {connect, useDispatch,useSelector} from 'react-redux';
import axios from 'axios';
import SearchBar from 'react-native-dynamic-search-bar'
const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.partnerName}</Text>
  </TouchableOpacity>
);

  let time

const Man1 = props => {

  const dispatch = useDispatch();
  const getVoucher = async () => {
    try {
      const response = await axios.post(
        'https://api-htvc.mediaone.dev/api/voucher/get-list-vouchers',
        {
          isHot: 1,
          limit: 15,
          skip: 11,
        },
      );
      // console.log(response.data.movies[2].id);
      //  console.log(response.data);
      // setData(response.data.data);
      dispatch({type: 'ADD_DATA', data: response.data.data});

      //  setData(response.data.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // getMovies();
    getVoucher();
  }, []);

  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  // const [paramChose, setParamChose] = useState([])
  const [editItem, seteditItem] = useState();
  const [inputText, setInputText] = useState();

  const [selectedArray, setSelectedArray] = useState([]);
  const onPressItem = item => {
    dispatch({type: 'CHOSE_DATA', data: item});
  };

  const renderItem = ({item}) => {
    const backgroundColor = selectedArray.some(element => element.id == item.id)
      ? '#6e3b6e'
      : '#ebf3fe';
    const color = selectedArray.some(element => element.id == item.id)
      ? 'white'
      : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          onPressItem(item);
        }}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  const onSearch = (val) => {
    // clearTimeout(time)
    // time = setTimeout(() =>{
      dispatch({
        type: 'SEARCH',
        payload: {val: val}
      });
    // }, 1000)
  }

  // const data12 = useSelector(state=>state.data)
  // console.log('data12', data12)

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{height: 200}}>
        <Swiper autoplay={true} autoplayTimeout={2.5}>
          <Image
            source={{
              uri: 'https://www.itl.cat/pngfile/big/34-343325_dual-doctor-strange-wallpaper-android.jpg',
            }}
            style={{width: '100%', height: 200}}
          />
          <Image
            source={{
              uri: 'http://hinhnenhd.com/wp-content/uploads/2021/08/top-1000-anh-nen-may-tinh-full-hd-4k-sieu-dep-chat-luong-sac-net-6.jpg',
            }}
            style={{width: '100%', height: 200}}
          />
          <Image
            source={{
              uri: 'http://hinhnenhd.com/wp-content/uploads/2021/08/top-1000-anh-nen-may-tinh-full-hd-4k-sieu-dep-chat-luong-sac-net-1.jpeg',
            }}
            style={{width: '100%', height: 200}}
          />
        </Swiper>
      </View> */}
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginHorizontal: 10,
            justifyContent: 'space-around',
            marginVertical: 10,
            marginTop: 15,
          }}>
          <SearchBar placeholder="Search Here..."
          lightTheme round editable={true}
          // value={state.search}
          // onChangeText={updateSearch}
            style={styles.inputTxt}
            defaultValue={inputText}
            onChangeText={partnerName => {setInputText(partnerName)
            onSearch(partnerName)}}
            onPress={() => {
              dispatch({
                type: 'SEARCH',
                payload: {id: editItem, val: inputText},
              });
            }}
            />

          {/* <TextInput
            placeholder="Search......."
            style={styles.inputTxt}
            defaultValue={inputText}
            onChangeText={partnerName => {setInputText(partnerName)
            onSearch(partnerName)}}
          />
          <TouchableOpacity
            style={styles.touch}
            onPress={() => {
              dispatch({
                type: 'SEARCH',
                payload: {id: editItem, val: inputText},
              });
            }}>
            <Text style={styles.txtTouch}>Search</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.touch}
            onPress={() => {
              navigation.navigate('Man2', {selectedArray: selectedArray});
            }}>
            <Text style={styles.txtTouch}>ADD</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => {
              getVoucher()
            }}>
            <Text style={styles.txtTouch}>REFRESH</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={props.myData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />


      {/* { searchData.map(item => <Text>{item.title}</Text>) } */}
    </SafeAreaView>
  );
};
function mapStateToProps(state) {
  return {
    myData: state.data,
  };
}

export default connect(mapStateToProps)(Man1);
// export default Man1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    // justifyContent:'center'
    backgroundColor: '#ffffff',
  },
  item: {
    padding: 20,
    marginVertical: 9,
    marginHorizontal: 16,
    // borderWidth: 0.5,
    borderRadius: 15,
    elevation: 6,
    shadowColor: '#008744',
  },
  title: {
    fontSize: 32,
  },
  inputTxt: {
    width: '52%',
    borderWidth: 2,
    borderRadius: 12,
    fontSize: 17,
    height: 42,
    borderColor: 'black',

  },
  touch: {
    backgroundColor: '#2e95fe',
    height: 40,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    right: -4,
  },
  txtTouch: {
    fontWeight: 'bold',
    color: 'white',
    fontSize:12
  },
});