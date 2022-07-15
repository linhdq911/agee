import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

const Man2 = props => {
  // const item = props.route.params.item
  // const[deleteArr,setDeleteArr] = DATA;
  const dispatch = useDispatch();
  const data = useSelector(state => state.chosedData);

  const [isModalisible, setisModalisible] = useState(false);
  const [inputText, setInputText] = useState();
  const [editItem, seteditItem] = useState();
  const [isRender, setisRender] = useState(false);
  const onPressItem = item => {
    setisModalisible(true);
    setInputText(item.partnerName);
    seteditItem(item.id);
  };

  return (
    <ScrollView  style={{backgroundColor:'#ffffff'}}>
      <Text style={{fontSize:20,textAlign:'center'}}>Tong so phan tu: {data.length}</Text>
      {data.map((item, index) => (
        <View key={item.id} style={styles.viewlist}>
          <TouchableOpacity onPress={() => onPressItem(item)}>
            <Text style={styles.txt}>
              {item.partnerName} Tuoi{'  '}
              {item.age}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              dispatch({
                type: 'DELETE',
                payload: item.id,
              });
            }}>
            <Text style={styles.txt}> Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Modal
        animationType="fade"
        visible={isModalisible}
        onRequestClose={() => setisModalisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.textt}>Change text</Text>
          <TextInput
            style={styles.txtInput}
            onChangeText={(partnerName) => setInputText(partnerName)}
            defaultValue={inputText}
            editable={true}
            multiline={false}
            maxLength={200}
          />
          <TouchableOpacity
            style={styles.touchSave}
            onPress={() => {
             
              dispatch({
                type: 'EDIT',
                payload: { id: editItem, val: inputText },
              });
            }}>
            <Text style={{ fontSize: 20, color: '#ffff' }}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Man2;

const styles = StyleSheet.create({
  viewlist: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ebf3fe',
    marginVertical: 2,
    height: 80,
    alignItems: 'center',
    marginHorizontal:10,
    borderRadius:7,
    marginVertical:5,
    // borderWidth:0.5,
    borderRadius:15
  },
  txt: {
    fontSize: 20,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: 'orange',
    // paddingHorizontal:7,
    height: 38,
    justifyContent: 'center',
    width: 70,
    borderRadius: 8,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtInput: {
    width: '90%',
    height: 60,
    borderColor: 'grey',
    borderWidth: 1,
    fontSize: 25,
    borderRadius: 15,
  },
  touchSave: {
    backgroundColor: 'orange',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
    width: '40%',
    height: 50,
    borderRadius: 20,
  },
  textt: {
    fontSize: 25,
  },
});