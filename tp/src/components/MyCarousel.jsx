import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const MyCarousel = (props) => {
    const width = Dimensions.get('window').width;
    let images=props.images;
    return (
        <View style={{ flex: 1}}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={[... new Array(images.length).keys()]}   
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}>
                        <img src={images[index]}></img>
                    </View>
                )}
            />
        </View>
    );
}

export default MyCarousel;