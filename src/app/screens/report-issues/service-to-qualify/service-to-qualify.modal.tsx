import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { setModalStatus } from '../../../../store/service-to-qualify';
import { connect, MapStateToProps } from 'react-redux';
import { InputText, Modal } from '@components/commons';
import { styles } from './service-to-qualify.styles';
import { StarsButton } from './stars-button';

type PropsFromState = {
  shouldShowModal?: boolean;
};

type PropsFromDispath = {
  setModalStatus?: typeof setModalStatus;
};

type ComponentProps = PropsFromState & PropsFromDispath;

const mapStateToProps: MapStateToProps<PropsFromState, {}, ReduxStore> =
  ({ serviceToQualify: { shouldShowModal } }) => ({ shouldShowModal });

// @ts-ignore
@connect(mapStateToProps, { setModalStatus })
export class ServiceToQualifyModal extends React.Component<ComponentProps> {

  handleSuccessAction = async () => {
    this.props.setModalStatus(false);
  }

  render() {
    return (
      <Modal
        visible={this.props.shouldShowModal}
        successAction={this.handleSuccessAction}
        successText="Calificar"
      >
        <View style={styles.modalContent}>
          <View style={styles.technicianInfoContainer}>
            <View style={styles.imageSection}>
              <Image
                source={require('../../../../../assets/girl2.jpg')}
                style={styles.image}
              />
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.name}>Luisa Garcia</Text>
              <Text style={styles.date}>22/09/2018 11:30am</Text>
            </View>
          </View>
          <View style={{
            height: 1,
            marginHorizontal: 10,
            alignSelf: 'stretch',
            backgroundColor: 'rgba(245,166,35,0.62)',
          }} />
          <View style={{ padding: 10 }}>
            <View style={[styles.titleSection, { marginBottom: 10 }]}>
              <Text style={styles.title}>Servicio realizado:</Text>
            </View>
            <View style={styles.descriptionSection}>
              <Text style={styles.description}>
                Se realizo mantenimiento al datafono resolviendo la falla que presentaba al momento
                de encender.
              </Text>
            </View>
          </View>
          <View style={[styles.serviceInfoContainer]}>
            <View style={[styles.titleSection, { marginBottom: 5 }]}>
              <Text style={styles.title}>Calidad del servicio:</Text>
            </View>
            <View style={[styles.descriptionSection, {
              justifyContent: 'center',
            }]}>
              <StarsButton />
            </View>
          </View>
          <View style={[styles.serviceInfoContainer]}>
            <View style={[styles.titleSection, { marginBottom: 5 }]}>
              <Text style={styles.title}>Atención del personal técnico:</Text>
            </View>
            <View style={[styles.descriptionSection, {
              justifyContent: 'center',
            }]}>
              <StarsButton />
            </View>
          </View>
          <View style={[styles.serviceInfoContainer]}>
            <View style={[styles.titleSection, { marginBottom: 5 }]}>
              <Text style={styles.title}>Solución adecuada en la visita:</Text>
            </View>
            <View style={[styles.descriptionSection, {
              justifyContent: 'center',
            }]}>
              <StarsButton />
            </View>
          </View>
          <View style={[styles.serviceInfoContainer]}>
            <InputText
              label="Observaciones"
              placeholder="Observaciones sobre el servicio"
              textArea
            />
          </View>

        </View>
      </Modal>
    );
  }
}
