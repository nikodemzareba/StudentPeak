
import React, {useRef, useState, useEffect} from 'react'
import {Dimensions, View, Text, FlatList } from 'react-native'
import styles from './styles'
import PostSingle from '../../../components/post'
import { getFeed } from '../../../components/services/posts'


export default function FeedScreen() {
    const [posts, setPosts] = useState([])
    const mediaRefs = useRef([])

    useEffect(() => {
        getFeed().then(setPosts)
    }, [])


    const onViewableItemsChanged = useRef(({ changed }) => {
        changed.forEach(element => {
            const cell = mediaRefs.current[element.key]
            if (cell) {
                if (element.isViewable) {
                    cell.play()
                } else {
                    cell.stop()
                }
            }

        });
    })


    /**
     *
     * @param {objec} item object of the post
     * @param {Integer} index position of the post in the flatlist
     * @returns
     */
    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, height: Dimensions.get('window').height, backgroundColor: 'black' }}>
                <PostSingle item={item} ref={PostSingleRef => (mediaRefs.current[item.id] = PostSingleRef)} />
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                windowSize={4}
                initialNumToRender={0}
                maxToRenderPerBatch={2}
                removeClippedSubviews
                muted={'muted'}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 100
                }}
                renderItem={renderItem}
                pagingEnabled
                keyExtractor={item => item.id}
                decelerationRate={'normal'}
                onViewableItemsChanged={onViewableItemsChanged.current}
            />
        </View>
    )
}

