import { useState } from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  CloseButton,
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import BusquedaCliente from './BusquedaCliente'
import BusquedaMedico from './BusquedaMedico';
const MultiStationForm = () => {
  const [currentStation, setCurrentStation] = useState(1);
  const [formData, setFormData] = useState({
    Cliente: {
      Cedula: '',
      Nombre: '',
      Apellido: '',
      Fecha: '',
      email: '',
      Telefono: ''
    },
    Medico: {
      Nombre: '',
      Especialidad: '',
      email: '',
      Telefono: '',
      Fecha: ''
    },
    Muestra: {
      TipoMuestra: '',
      NumeroMuestra: '',
      Observaciones: '',
      fechaRecogida: ''
    },
  });

  const [showAlert, setShowAlert] = useState(false);
  const stationName = ["Cliente", "Medico", "Muestra"][currentStation - 1];
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [stationName]: {
        ...formData[stationName],
        [name]: value,
      },
    });
  };
  //alerta 
  const handleNextStation = () => {
    if (
      Object.values(formData[stationName]).every(
        (value) => value !== ''
      )
    ) {
      setCurrentStation(currentStation + 1);
      setShowAlert(false);
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };


  const handlePreviousStation = () => {
    setCurrentStation(currentStation - 1);
  };
  //para la tabla flotante 
  const [mostrarModal, setMostrarModal] = useState(false);

  const toggleModal = () => {
    setMostrarModal(!mostrarModal);
  };


  return (
    <div>
      {showAlert && (
        <Alert status='error' mb={4}>
          <AlertIcon />
          Por favor llene todos los campos antes de continuar.
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => setShowAlert(false)}
          />
        </Alert>
      )}
      <form>
        {currentStation === 1 && (
          <>
            <Text fontSize={'20px'} margin='15px auto 30px auto' color={'gray.600'}>Información Personal</Text>
            <Grid templateColumns={'repeat(2,1fr)'} gap='20px'>
              <FormControl mb={3}>
                <Input
                  placeholder='Cédula:'
                  type="number"
                  name="Cedula"
                  value={formData[currentStation]?.Cedula}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid templateColumns={'repeat(2,1fr)'} gap='20px'>
              <FormControl mb={3}>
                <Input
                  placeholder='Nombres:'
                  type="text"
                  name="Nombre"
                  value={formData[currentStation]?.Nombre}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={3}>
                <Input
                  placeholder='Apellidos:'
                  type="text"
                  name="Apellido"
                  value={formData[currentStation]?.Apellido}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid templateColumns={'repeat(2,1fr)'} gap='20px'>
              <FormControl mb={3}>
                <Input
                  placeholder='Fecha de Nacimiento (DD/MM/AAAA) '
                  type="Text"
                  name="Fecha"
                  value={formData[currentStation]?.Fecha}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={3}>
                <Input
                  placeholder='Procedencia '
                  type="text"
                  name="Procedencia"
                  value={formData[currentStation]?.Procedencia}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Text fontSize={'20px'} margin='15px auto 30px auto' color={'gray.600'}>Información de Contacto</Text>
            <Grid templateColumns={'repeat(2,1fr)'} gap='20px'>
              <FormControl mb={3}>
                <Input
                  placeholder='Email:'
                  type="email"
                  name="email"
                  value={formData[currentStation]?.email}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={3}>
                <Input
                  placeholder='Telefono de Contacto:'
                  type="text"
                  name="Telefono"
                  value={formData[currentStation]?.Telefono}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

          </>
        )}
        {currentStation === 2 && (
          <>
            <Text fontSize={'20px'} margin='15px auto 30px auto' color={'gray.600'}>Información Personal</Text>
            <Grid templateColumns={'repeat(2,1fr)'} gap='20px'>
              <FormControl mb={3}>
                <Input
                  placeholder='Nombres:'
                  type="text"
                  name="Nombre"
                  value={formData[currentStation]?.Nombre}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={3}>
                <Input
                  placeholder='Apellidos:'
                  type="text"
                  name="Apellido"
                  value={formData[currentStation]?.Apellido}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Grid templateColumns={'repeat(2,1fr)'} gap='20px'>
              <FormControl mb={3}>
                <Input
                  placeholder='Especialidad '
                  type="text"
                  name="Especialidad"
                  value={formData[currentStation]?.Especialidad}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>
            <Text fontSize={'20px'} margin='15px auto 30px auto' color={'gray.600'}>Información de Contacto</Text>
            <Grid templateColumns={'repeat(2,1fr)'} gap='20px'>
              <FormControl mb={3}>
                <Input
                  placeholder='Email:'
                  type="email"
                  name="email"
                  value={formData[currentStation]?.email}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb={3}>
                <Input
                  placeholder='Telefono de Contacto:'
                  type="text"
                  name="Telefono"
                  value={formData[currentStation]?.Telefono}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

          </>
        )}
        {currentStation === 3 && (
          <>
            <FormControl mb={3}>
              <FormLabel>Tipo de muestra:</FormLabel>
              <Input
                type="text"
                name="TipoMuestra"
                value={formData[currentStation]?.TipoMuestra}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Número de muestra:</FormLabel>
              <Input
                type="text"
                name="NumeroMuestra"
                value={formData[currentStation]?.NumeroMuestra}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Observaciones:</FormLabel>
              <Input
                type="text"
                name="Observaciones"
                value={formData[currentStation]?.Observaciones}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Fecha de recogida:</FormLabel>
              <Input
                type="date"
                name="fechaRecogida"
                value={formData[currentStation]?.fechaRecogida}
                onChange={handleInputChange}
              />
            </FormControl>
          </>
        )}

        <Button
          marginRight={'95%'}
          marginBottom='-23.5%'
          colorScheme="blue"
          mr={3}
          onClick={handlePreviousStation}
          disabled={currentStation === 1}
          width={'40px'}
          height='40px'
          borderRadius={'50%'}
          bgColor={'#137797'}
          color='#ffff'
        >
          <ChevronLeftIcon
            boxSize="2em"
            strokeWidth="2" />
        </Button>
        <Button
          padding={'10px 60px'}
          marginTop='20px'
          bgColor={'#137797'}
          color='#ffff'
          onClick={toggleModal}>
          Ver más</Button>
        {currentStation === 1 && (
          <Modal
            size={'4xl'}
            maxWidth='100%'
            isOpen={mostrarModal}
            onClose={toggleModal}>
            <ModalOverlay />
            <ModalContent bg="#ffff">
              <ModalHeader>
                <Button
                  borderRadius={'50%'}
                  colorScheme="blue"
                  width="40px"
                  height="40px"
                  marginLeft={'95%'}
                  marginTop={'-60px'}
                  bgColor={'#137797'}
                  color='#ffff'
                  onClick={toggleModal}>
                  <CloseButton
                  />
                </Button>
              </ModalHeader>
              <ModalBody>
                <BusquedaCliente />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}

        {currentStation === 2 && (
          <Modal size={'md'} maxWidth='100%' isOpen={mostrarModal} onClose={toggleModal}>
            <ModalOverlay />
            <ModalContent bg="#ffff">
              <ModalHeader>
                <Button colorScheme="blue" mr={3} onClick={toggleModal}>
                  Cerrar
                </Button>
              </ModalHeader>
              <ModalBody>
                <BusquedaMedico />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
        <Button
          marginLeft={'95%'}
          marginBottom='-13%'
          width={'40px'}
          height='40px'
          borderRadius={'50%'}
          bgColor={'#137797'}
          color='#ffff'
          onClick={handleNextStation}>
          {currentStation === 3 ? "Enviar" : <ChevronRightIcon boxSize="2em" strokeWidth="2" />}
        </Button>
      </form>
    </div>
  );
};

export default MultiStationForm; 
