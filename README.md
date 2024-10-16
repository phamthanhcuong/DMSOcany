This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:
## Architect Project
/root_project
│
├── /src
│   ├── /api                           # Quản lý giao tiếp với API server
│   │   ├── apiService.ts               # API service chung, cấu hình base URL và token
│   │   ├── customerApi.ts              # API quản lý khách hàng (GET, POST, PUT, DELETE)
│   │   ├── orderApi.ts                 # API quản lý đơn hàng
│   │   ├── authApi.ts                  # API xác thực người dùng
│   │   └── reportApi.ts                # API lấy báo cáo
│
│   ├── /components                     # Thành phần giao diện tái sử dụng
│   │   ├── buttons                     # Nút bấm tái sử dụng
│   │   │   └── CustomButton.tsx
│   │   ├── forms                       # Các form nhập liệu tái sử dụng
│   │   │   ├── CustomerForm.tsx
│   │   │   └── OrderForm.tsx
│   │   ├── lists                       # Các danh sách tái sử dụng
│   │   │   ├── CustomerList.tsx
│   │   │   └── OrderList.tsx
│   │   └── common                      # Thành phần chung như hiển thị lỗi, spinner
│       │   ├── ErrorMessage.tsx        # Hiển thị thông báo lỗi
│       │   └── LoadingSpinner.tsx      # Hiển thị hiệu ứng tải
│
│   ├── /navigations                    # Quản lý điều hướng ứng dụng
│   │   ├── AppNavigator.tsx            # Điều hướng chính của app
│   │   ├── AuthNavigator.tsx           # Điều hướng cho phần xác thực
│   │   └── CustomerNavigator.tsx       # Điều hướng riêng cho quản lý khách hàng
│
│   ├── /screens                        # Các màn hình chính
│   │   ├── Auth                        # Màn hình xác thực (Login, ChangePassword)
│   │   │   ├── LoginScreen.tsx
│   │   │   └── ChangePasswordScreen.tsx
│   │   ├── Dashboard                   # Màn hình chính
│   │   ├── Sidebar                     # Màn hình sidebar
│   │   ├── CustomerManagement          # Quản lý khách hàng
│   │   │   ├── CustomerListScreen.tsx
│   │   │   └── AddCustomerScreen.tsx
│   │   ├── OrderManagement             # Quản lý đơn hàng
│   │   │   ├── OrderListScreen.tsx
│   │   │   └── AddOrderScreen.tsx
│   │   ├── CheckinCheckout             # Quản lý check-in/check-out
│   │   │   └── CheckinCheckoutScreen.tsx
│   │   └── Report                      # Màn hình báo cáo
│       │   └── ReportScreen.tsx
│
│   ├── /services                       # Xử lý logic nghiệp vụ và tương tác API/Realm
│   │   ├── customerService.ts          # Dịch vụ quản lý khách hàng (fetch API, Realm)
│   │   ├── orderService.ts             # Dịch vụ quản lý đơn hàng
│   │   ├── authService.ts              # Dịch vụ xác thực người dùng
│   │   ├── reportService.ts            # Dịch vụ báo cáo
│   │   └── syncService.ts              # Dịch vụ đồng bộ dữ liệu khi có mạng trở lại
│
│   ├── /redux                          # Quản lý trạng thái toàn cục
│   │   ├── hooks.ts                    # Custom hooks cho Redux
│   │   ├── store.ts                    # Cấu hình store của Redux
│   │   ├── slices                      # Quản lý từng phần dữ liệu với Redux slices
│   │   │   ├── customerSlice.ts        # Trạng thái khách hàng
│   │   │   ├── orderSlice.ts           # Trạng thái đơn hàng
│   │   │   ├── authSlice.ts            # Trạng thái xác thực
│   │   │   └── reportSlice.ts          # Trạng thái báo cáo
│
│   ├── /utils                          # Các hàm tiện ích và hằng số dùng chung
│   │   ├── constants.ts                # Hằng số chung
│   │   ├── errorHandler.ts             # Hàm xử lý lỗi
│   │   └── helpers.ts                  # Hàm hỗ trợ (ví dụ format date)
│
│   ├── /hooks                          # Custom hooks, ví dụ quản lý mạng
│   │   └── useNetwork.ts               # Hook quản lý kết nối mạng (online/offline)
│
│   ├── /database                       # Quản lý Realm và các schema dữ liệu
│   │   ├── realmConfig.ts              # Cấu hình Realm
│   │   ├── schemas                     # Các schema của Realm
│   │   │   ├── customerSchema.ts       # Schema của khách hàng
│   │   │   ├── orderSchema.ts          # Schema của đơn hàng
│   │   │   ├── checkInOutSchema.ts     # Schema check-in/check-out
│   │   │   └── userSchema.ts           # Schema người dùng
│
│   ├── /models                         # Mô hình dữ liệu TypeScript
│   │   ├── customerModel.ts            # Mô hình khách hàng
│   │   └── orderModel.ts               # Mô hình đơn hàng
│
│   ├── App.tsx                         # Điểm khởi đầu của ứng dụng
│   └── index.js                        # Entry point chính của ứng dụng
│
├── /node_modules                       # Thư viện Node.js
├── package.json                        # Thông tin gói npm và script
└── README.md                           # Tài liệu dự án

