import * as React from 'react';
import {
  Animated,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Dimensions, StyleProp, ViewStyle,
  Platform,
} from 'react-native';

import { styles } from './selectbox.styles';
import { InputRadio, InputText, MaterialIcon } from '..';
import { Colors, Icons } from '../../../../config/constants/styles';

const { height } = Dimensions.get('window');

type ComponentProps = {
  label: string;
  selectedValue: string | number;
  options?: SelectionBoxOption[];
  onChange: (value: SelectionBoxOption, position: number) => void;
  onToggleModal?: (value: boolean) => void;
  withFilter?: boolean;
  style?: StyleProp<ViewStyle>;
};

type ComponentState = {
  modalVisible: boolean;
  filter: string,
  isKeyboardOpened: boolean;
  shouldToggleModal: boolean;
};

export class SelectBox extends React.Component<ComponentProps, ComponentState> {
  keyboardWillShowListener: any;
  keyboardWillHideListener: any;
  keyboardDidHideListener: any;
  modalBoxPosition = new Animated.Value(height / 2);
  state: ComponentState = {
    modalVisible: false,
    isKeyboardOpened: false,
    filter: '',
    shouldToggleModal: false,
  };

  static defaultProps = {
    options: [],
  };

  componentDidMount() {
    this.keyboardWillShowListener = Keyboard
      .addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', this.handleKeyboardWillShow);

    this.keyboardWillHideListener = Keyboard
      .addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', this.handleKeyboardWillHide);

    this.keyboardDidHideListener = Keyboard
      .addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleKeyboardWillShow = (event) => {
    this.setState({ isKeyboardOpened: true });
    if(Platform.OS === 'ios'){
      Animated.timing(this.modalBoxPosition, {
        toValue: -event.endCoordinates.height,
        duration: 400,
      }).start();
    }
  }

  handleKeyboardWillHide = () => {
    Animated.timing(this.modalBoxPosition, {
      toValue: 0,
      duration: 100,
    }).start();
  }

  handleKeyboardDidHide = () => {
    const { shouldToggleModal } = this.state;
    if (shouldToggleModal) this.toggleSelectionModal();
    this.setState({ isKeyboardOpened: false });
  }

  openSelectionModal = () => {
    const { isKeyboardOpened } = this.state;
    if (!isKeyboardOpened) {
      this.toggleSelectionModal();
    } else {
      this.setState({ shouldToggleModal: true }, Keyboard.dismiss);
    }
  }

  toggleSelectionModal = () => {
    const { onToggleModal } = this.props;
    this.setState(
      ({ modalVisible }) => ({ modalVisible: !modalVisible }),
      () => {
        if (!this.state.modalVisible) {
          this.modalBoxPosition.setValue(height / 2);
          this.setState({ shouldToggleModal: false });
        }
        if (onToggleModal) onToggleModal(this.state.modalVisible);
      },
    );
  }

  handleModalShowEvent = () => {
    Animated.timing(
      this.modalBoxPosition,
      {
        toValue: 0,
        duration: 300,
      },
    ).start();
  }

  getModalBoxStyles() {
    return [styles.modalBox, {
      transform: [{ translateY: this.modalBoxPosition }],
    }];
  }

  renderOptions() {
    const { selectedValue, onChange, options } = this.props;
    const { filter } = this.state;
    return options.reduce(
      (acc, option, index) => {
        if (option.label.toUpperCase().includes(filter.toUpperCase())) {
          return acc.concat((
            <View style={styles.selectionItem} key={index}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                {option.image && (
                  <View
                    style={{
                      marginVertical: 10,
                    }}
                  >
                    <Image
                      source={{ uri: option.image, cache: 'only-if-cached' }}
                      style={{
                        width: 50,
                        height: 50,
                        marginRight: 10,
                      }}
                      resizeMode={'stretch'}
                    />
                  </View>
                )}
                <Text style={styles.selectionItemText}>{option.label}</Text>
              </View>
              <InputRadio
                selected={option.value === selectedValue}
                onPress={() => onChange(option, index)}
              />
            </View>
          ));
        }

        return acc;
      },
      [],
    );
  }

  renderFilter() {
    return (
      <View style={{
        padding: 10,
        flexDirection: 'row',
      }}>
        <InputText
          placeholder="Filtrar"
          rightIcon={Icons.search}
          value={this.state.filter}
          onChange={filter => this.setState({ filter })}
        />
      </View>
    );
  }

  render() {
    const {
      label,
      options,
      selectedValue,
      withFilter,
      style,
    } = this.props;


    const selectedLabel =
      (options.length &&
        (selectedValue && options.find(({ value }) => value === selectedValue).label ||
          options[0].label)) || '';

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity style={styles.inputBox}
                          onPress={this.openSelectionModal}
        >
          <Text style={styles.selectionItemText}>
            {selectedLabel}
          </Text>
          <MaterialIcon name={Icons.caretDown} size={30} color={Colors.dark} />
        </TouchableOpacity>
        <Modal visible={this.state.modalVisible}
               onShow={this.handleModalShowEvent}
               animationType="none"
               transparent
               onRequestClose={() => console.log('asd')}
        >
          <View style={styles.modalContent}>
            <Animated.View style={this.getModalBoxStyles()}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Seleccione una opción</Text>
                <TouchableOpacity
                  onPress={this.toggleSelectionModal}
                >
                  <MaterialIcon name={Icons.close} size={24} color={Colors.white} />
                </TouchableOpacity>
              </View>

              <ScrollView keyboardShouldPersistTaps="handled">
                {this.renderOptions()}
              </ScrollView>
              {withFilter && this.renderFilter()}
            </Animated.View>
          </View>
        </Modal>
      </View>
    );
  }
}
