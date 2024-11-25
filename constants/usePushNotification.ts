import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import useToast from '@/constants/useToast';
import { useAuthStore } from '@/store/useAuth';


const usePushNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const showToast = useToast()
  const subscribeUser = useAuthStore((state:any) => state.subscribe)

  const subscribeToken = async(token:string)=>{
    const subscribed = await subscribeUser(token)

    if(subscribed.success){
      console.log(subscribed)
      // return showToast(subscribed.msg,true)
    }else{
      return showToast(subscribed.msg,false)
    }

  }


  useEffect(()=> {
    async function registerForPushNotificationsAsync() {
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Permission not granted to get push token for push notification!');
          return;
        }
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
          alert('Project ID not found');
        }
        try {
          const pushTokenString = (
            await Notifications.getExpoPushTokenAsync({
              projectId,
            })
          ).data;
          console.log(pushTokenString);
          return pushTokenString;
        } catch (e: unknown) {
          alert(`${e}`);
        }
      } else {
        alert('Must use physical device for push notifications');
      }
    }

    registerForPushNotificationsAsync()
      .then(async(token )=>{ 
        setExpoPushToken(token ?? '')
        if(token) await subscribeToken(token)
      })
      .catch(error => alert(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification.request.content.title)
      console.log(notification.request.content.body)
      showToast((notification.request.content.body as string),true)
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&  Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&  Notifications.removeNotificationSubscription(responseListener.current); 

    };
  }, []);

  return { expoPushToken, notification };
};

export default usePushNotification;