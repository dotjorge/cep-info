import React, { useState, useRef, useEffect } from "react"
import {
  Input,
  VStack,
  Icon,
  Box,
  FormControl,
  Button,
  Text,
  useColorModeValue,
  useTheme,
} from "native-base"
import { Ionicons } from "@expo/vector-icons"
import SafeAreaView from "../../components/SafeAreaView"
import axios from "axios"

export default function AddItem() {
  const { colors } = useTheme()
  const amber = useColorModeValue(colors.amber[500], colors.amber[900])
  const [cepInput, setCepInput] = useState("")
  const [inputIsValid, setInputIsValid] = useState(true)
  const [cepInfo, setCepInfo] = useState({
    cep: "undefined",
    logradouro: "undefined",
    complemento: "undefined",
    bairro: "undefined",
    localidade: "undefined",
    uf: "undefined",
    ibge: "undefined",
    gia: "undefined",
    ddd: "undefined",
    siafi: "undefined",
  })

  // Input refs
  const cepRef = useRef()

  // When screen is loaded
  useEffect(() => {
    cepRef.current.focus()
  }, [])

  function handleCepSearch() {
    if (!cepInput) {
      setInputIsValid(false)
      setTimeout(() => cepRef.current.focus(), 1000)
      return
    }
    axios
      .get(`https://viacep.com.br/ws/${cepInput}/json/`)
      .then(response => {
        setCepInfo(response.data)
        setInputIsValid(true)
        setCepInput("")
      })
      .catch(() => setInputIsValid(false))
  }

  return (
    <SafeAreaView>
      <Box alignItems="stretch" p="8" marginX={"auto"} maxW={"xl"} width={"full"}>
        <VStack alignItems="stretch" space="5">
          <FormControl>
            <FormControl.Label mb="3">Find CEP information</FormControl.Label>
            <Input
              ref={cepRef}
              placeholder="CEP"
              ariaLabel={"CEP to consult"}
              isInvalid={!inputIsValid}
              value={cepInput}
              type={"number"}
              maxLength={8}
              onChangeText={text => setCepInput(text.replace(/[^0-9]/g, ""))}
              onSubmitEditing={handleCepSearch}
              borderRadius={10}
            />
          </FormControl>
        </VStack>
        <Button
          ariaLabel={"Consult"}
          borderRadius={10}
          colorScheme="amber"
          mt="5"
          rightIcon={<Icon as={Ionicons} name="search" size="sm" />}
          onPress={handleCepSearch}>
          Search
        </Button>

        {cepInfo["cep"] !== "undefined" && (
          <Box bgColor={"white"} p={5} borderRadius={20} mt={5}>
            <Text fontSize={"md"} style={{ color: amber }} bold>
              Result
            </Text>
            {Object.entries(cepInfo).map(prop => (
              <Text key={prop[0]} marginY={0.5}>
                {prop[0].charAt(0).toUpperCase() + prop[0].slice(1) + ": " + prop[1]}
              </Text>
            ))}
          </Box>
        )}
      </Box>
    </SafeAreaView>
  )
}
