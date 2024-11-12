import React, { useRef, useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Dimensions, Text, TouchableOpacity, Image, Linking } from 'react-native';
import PressableItem from '../utills/PressableItem';


const windowWidth = Dimensions.get('window').width;

const Coursole = ({ DATA,baseUrl }) => {

    // console.log('Data',DATA);
    
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);


    const handleImageClick = (url = '') => {
        if (url) {
            Linking.openURL(url)
        }
    }



    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === DATA?.length - 1 ? 0 : prevIndex + 1
            );
        }, 10000); // Auto scroll interval

        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

   

    const handleArrowPress = (direction) => {
        if (direction === 'left') {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? DATA?.length - 1 : prevIndex - 1
            );
        } else {
            setCurrentIndex((prevIndex) =>
                prevIndex === DATA?.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            {/* {console.log(`${baseUrl}${item.image}`) } */}
            {/* <View style={styles.courImgCon}> */}
            <PressableItem externalFunction={()=>handleImageClick(item.link)} >
                <View style={styles.courImgCon}>
                <Image source={{uri:`${baseUrl}${item.image}`}} style={styles.courImg}
                    resizeMode='stretch' />
                </View>
            </PressableItem>

            {/* </View> */}
        </View>
    );


    useEffect(() => {
        flatListRef.current?.scrollToIndex({
            index: currentIndex,
            animated: true,
        });
    }, [currentIndex]);

    return (
        <View style={styles.container}>
            {/* Left Arrow Button */}
            <TouchableOpacity
                style={styles.arrowLeft}
                onPress={() => handleArrowPress('left')}
            >
                <Text style={styles.arrowText}>{'<'}</Text>
            </TouchableOpacity>

            {/* Carousel */}
            <FlatList
                ref={flatListRef}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                scrollEnabled={true} // Disable manual scroll to control through arrows and auto-scroll
            />

            {/* Right Arrow Button */}
            <TouchableOpacity
                style={styles.arrowRight}
                onPress={() => handleArrowPress('right')}
            >
                <Text style={styles.arrowText}>{'>'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        width: windowWidth - 50,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        marginHorizontal: 25,
        borderRadius: 8,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
        overflow: 'hidden',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    arrowLeft: {
        position: 'absolute',
        left: -5,
        top: '45%',
        zIndex: 1,
        padding: 10,
        // backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 30,
    },
    arrowRight: {
        position: 'absolute',
        right: -5,
        top: '45%',
        zIndex: 1,
        padding: 10,
        // backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 30,
    },
    arrowText: {
        fontSize: 30,
        color: 'black',
    },
    courImgCon: {
        width: windowWidth - 50,
        height: 200,
    },
    courImg: {
        width: '100%',
        height: '100%',
        // resizeMode: 'stretch'
    },
});

export default Coursole;
