import * as React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';

import { styles } from './supply-list-item.styles';
import { MaterialIcon } from '..';
import { Colors, FontSizes, Icons } from '../../../../config/constants/styles';

import { updateSupplyAmount } from '../../../../store/supplies';
import { connect } from 'react-redux';

type OwnProps = {
  supplyItem: Supply;
  onDelete: (itemId: number) => void;
};

type PropsFromDispatch = {
  updateSupplyAmount?: typeof updateSupplyAmount;
};

type ComponentProps = PropsFromDispatch & OwnProps;

// @ts-ignore
@connect(null, { updateSupplyAmount })
export class SupplyListItem extends React.Component<ComponentProps> {

  increaseAction = () => {
    const { supplyItem: { item: { id }, amount }, updateSupplyAmount } = this.props;
    updateSupplyAmount(id, amount + 1);
  }

  decreaseAction = () => {
    const { supplyItem: { item: { id }, amount }, updateSupplyAmount } = this.props;
    if (amount > 0) updateSupplyAmount(id, amount - 1);
  }

  deleteAction = () => {
    const { supplyItem: { item: { id } }, onDelete } = this.props;
    onDelete(id);
  }

  handleItemInputChange = (value: string) => {
    const { supplyItem: { item: { id } }, updateSupplyAmount } = this.props;
    const amount = value ? parseInt(value, 0) : 0;
    updateSupplyAmount(id, amount);
  }

  render() {
    const {
      item: { name },
      amount,
    } = this.props.supplyItem;

    return (
      <View style={styles.itemContainer}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>
            {name}
          </Text>
        </View>
        <View style={styles.controlsSection}>
          <View style={styles.controlsBox}>
            <TouchableOpacity onPress={this.decreaseAction} style={{
              padding: 5,
            }}>
              <MaterialIcon name={Icons.minusCircle} color={Colors.blue2} />
            </TouchableOpacity>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <TextInput
                value={`${amount}`}
                style={styles.amount}
                keyboardType="numeric"
                onChangeText={this.handleItemInputChange}
              />
              <Text style={{
                color: Colors.dark,
                fontSize: FontSizes.tiny,
              }}>Cantidad</Text>
            </View>
            <TouchableOpacity onPress={this.increaseAction} style={{
              padding: 5,
            }}>
              <MaterialIcon name={Icons.plusCircle} color={Colors.blue2} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={this.deleteAction} style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
          }}>
            <MaterialIcon name={Icons.delete} color={Colors.red} size={18} />
            <Text style={{
              color: Colors.red,
              fontSize: FontSizes.tiny,
            }}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};
