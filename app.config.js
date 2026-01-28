export default {
  expo: {
    name: "ninja-build",
    slug: "ninja-build",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "ninjabuild",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    jsEngine: "hermes",

    ios: {
      supportsTablet: true,
    },

    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.bereket1.ninjabuild",
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },

    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
      "expo-audio",
      "expo-asset",
    ],

    experiments: {
      typedRoutes: true,
    },

    extra: {
      router: {},
      eas: {
        projectId: "37521686-efcd-4b2c-8fd3-a4c24dcfd9a1",
      },

      // 👇 ADD THIS BLOCK
      appwrite: {
        endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
        projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
        databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
        galleriesCollectionId:
          process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
        reviewsCollectionId:
          process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
        agentsCollectionId:
          process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
        propertiesCollectionId:
          process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
        bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
      },
    },
  },
};
