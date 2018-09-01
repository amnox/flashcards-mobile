import React from 'react'
import { View, StyleSheet,AsyncStorage } from 'react-native'
import { 
  FontAwesome, 
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons'
import { Notifications, Permissions } from 'expo'
import {
  red, blue , lightPurp,
  white, orange, pink
} from './colors'

const NOTIFICATION_KEY = 'flashcardsapp:notifications'

export function isBetween (num, x, y) {
    if (num >= x && num <= y) {
      return true
    }
  
    return false
  }
  
export function calculateDirection (heading) {
  let direction = ''

  if (isBetween(heading, 0, 22.5)) {
    direction = 'North'
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = 'North East'
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = 'East'
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = 'South East'
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = 'South'
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = 'South West'
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = 'West'
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = 'North West'
  } else if (isBetween(heading, 337.5, 360)) {
    direction = 'North'
  } else {
    direction = 'Calculating'
  }

  return direction
}

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  }
})

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createLocalNotification(){
  return {
    title:'Time to take a Quiz!',
    body:'Practice makes perfect. Revise your decks by taking a quiz.',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: 'false',
      vibrate: 'true'
    }
  }
}

export function setLocalNotification(){
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data)=>{
      if (data===null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status })=>{
            if (status==='granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              let tommorow = new Date()
              tommorow.setDate(tommorow.getDate()+1)
              tommorow.setHours(20)
              tommorow.setMinutes(0)
              Notifications.scheduleLocalNotificationAsync(
                createLocalNotification(),
                {
                  time:tommorow,
                  repeat:'day'
                }
              )
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}