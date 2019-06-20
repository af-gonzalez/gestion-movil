import * as React from 'react';
import { Dimensions } from 'react-native';
import { NavigationScreenProp, NavigationState, withNavigation } from 'react-navigation';
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Platform,
} from 'react-native';
import { Colors, Fonts, FontSizes, Icons } from '../../../../config/constants/styles';
import { MaterialIcon } from '../../commons';

const logo = require('../../../../../assets/redebanLogo.png');

type ComponentProps = {
  title: string;
  mainView?: boolean;
  navigation?: NavigationScreenProp<NavigationState, {}>;
};

type ComponentStyles = {
  container: ViewStyle;
  topSection: ViewStyle;
  logo: ImageStyle;
  menuIcon: TextStyle;
  bottomSection: ViewStyle;
  title: TextStyle;
  backButton: ViewStyle;
};

const dim = Dimensions.get('window');

function isIPhoneXSize(dim) {
  return dim.height === 812 || dim.width === 812;
}

// @ts-ignore
@withNavigation
export class Header extends React.Component<ComponentProps> {

  openDrawerMenu = () => {
    this.props.navigation.openDrawer();
  }

  backToPreviousRoute = () => {
    this.props.navigation.goBack(null);
  }

  render() {
    const { title, mainView, children } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <TouchableOpacity onPress={this.openDrawerMenu} style={{ width: 30 }}>
            <MaterialIcon name={Icons.menu} color={Colors.dark} />
          </TouchableOpacity>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <View style={{ position: 'absolute', right: 0 }}>
            {children}
          </View>
        </View>
        <View style={styles.bottomSection}>
          {
            !mainView && (
              <TouchableOpacity style={styles.backButton} onPress={this.backToPreviousRoute}>
                <MaterialIcon name={Icons.chevronLeft} size={35} color={Colors.complementary} />
              </TouchableOpacity>
            )
          }
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create<ComponentStyles>({
  container: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'stretch',
    height: Platform.OS === 'ios' ? isIPhoneXSize(dim) && 120 || 100 : 120,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? isIPhoneXSize(dim) && 40 || 20 : 40,
    paddingBottom: 10,
    shadowOffset: { width: 1, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    zIndex: 1,
  },
  topSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: 120,
    height: 40,
  },
  menuIcon: {
    color: Colors.dark,
    fontFamily: Fonts.IconsFont,
    fontSize: 24,
  },
  bottomSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.Bold,
    fontSize: FontSizes.title,
    color: Colors.dark,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    width: 60,
  },
});
