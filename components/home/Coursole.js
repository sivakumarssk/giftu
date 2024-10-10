import React, { useRef, useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';

const DATA = [
    { id: '1', title: 'Item 1', image: require('../../assets/createEvents/birthday.jpeg') },
    { id: '2', title: 'Item 2', image: require('../../assets/createEvents/fathersday.jpeg') },
    { id: '3', title: 'Item 3', image: require('../../assets/createEvents/mothersday.jpeg') },
    //   { id: '4', title: 'Item 4',image:require('../../assets/createEvents/') },
    //   { id: '5', title: 'Item 5',image:require('../../assets/createEvents/') },
];

const windowWidth = Dimensions.get('window').width;

const Coursole = () => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto scroll every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === DATA.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Auto scroll interval

        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    useEffect(() => {
        flatListRef.current?.scrollToIndex({
            index: currentIndex,
            animated: true,
        });
    }, [currentIndex]);

    const handleArrowPress = (direction) => {
        if (direction === 'left') {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? DATA.length - 1 : prevIndex - 1
            );
        } else {
            setCurrentIndex((prevIndex) =>
                prevIndex === DATA.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            {/* <View style={styles.courImgCon}> */}
                <Image source={item.image} style={styles.courImg}
                    resizeMode='stretch' />
            {/* </View> */}
        </View>
    );

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
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                scrollEnabled={false} // Disable manual scroll to control through arrows and auto-scroll
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
        width: windowWidth-50,
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
        overflow:'hidden',
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
    courImgCon:{
        width:400,
        height:300,
    },
    courImg: {
        width:'100%',
        height:'100%',
        resizeMode: 'contain'
    },
});

export default Coursole;
