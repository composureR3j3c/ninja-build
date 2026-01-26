import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
interface SettingsItemProp {
  icon: any;
  title: string;
  target?: any;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

import { settings } from "@/constants/data";
import { logout } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { router } from 'expo-router';

const SettingsItem = ({
  icon,
  title,
  target,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <TouchableOpacity
    onPress={()=>{
     if(target){
        router.push(target);
      }
    }}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6 text-black-300" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>

    {showArrow && <Image source={require('@/assets/icons/right-arrow.png')} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();
  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetch(); // redirect to login or home screen
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7">
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={require('@/assets/icons/bell.png')} className="size-5" />
        </View>
        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image source={
              user?.avatar??
              require('@/assets/images/avatar.png')
            } className="size-44 relative rounded-full" />
            <TouchableOpacity className='absolute bottom-11'>
              <Image source={require('@/assets/icons/edit.png')} className="size-9" />
            </TouchableOpacity>
            <Text className='text-2xl font-rubik-bold mt-2'>{user?.name}</Text>
          </View>
        </View>
        <View className="flex flex-col mt-10">
          {/* <SettingsItem icon={require('@/assets/icons/calendar.png')} title="My Bookings" />
          <SettingsItem icon={require('@/assets/icons/wallet.png')} title="Payments" /> */}
        </View>
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200 ">
          {settings.slice(0).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
          <SettingsItem
            icon={require('@/assets/icons/logout.png')}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
