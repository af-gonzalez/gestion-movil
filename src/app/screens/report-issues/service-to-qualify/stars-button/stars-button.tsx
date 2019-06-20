import * as React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { MaterialIcon } from '@components/commons';
import { Colors, Icons } from '../../../../../config/constants/styles';

type ComponentState = {
  yellowStarsCount: number;
};

export class StarsButton extends React.Component<{}, ComponentState> {
  state: ComponentState = {
    yellowStarsCount: 0,
  };

  handleButtonPress = () => this.setState(({ yellowStarsCount }) => {
    return {
      yellowStarsCount: yellowStarsCount === 5 ? 0 : yellowStarsCount + 1,
    };
  })

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.handleButtonPress}
                        >
        <View style={{ flexDirection: 'row' }}>
          {
            [1, 2, 3, 4, 5].map(value => (
              <MaterialIcon
                name={Icons.star}
                color={value <= this.state.yellowStarsCount ? Colors.yellow : Colors.gray}
                key={value}
              />
            ))
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
