import { CaretDown } from 'phosphor-react-native';
import { Dispatch, useState } from 'react';
import { Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from 'tailwindcss/colors';

type SetStateCallback<State> = (prevState: State) => State;

interface Option {
  value: string | number;
  label: string;
}

interface MultipleSelectProps {
  label?: string;
  selected: number[];
  setSelected: Dispatch<SetStateCallback<any[]>>;
  options: Option[];
  required?: boolean;
}

export function MultipleSelect({
  label,
  selected,
  setSelected,
  options,
  required,
}: MultipleSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <View className="flex flex-row gap-1">
        {required ? (
          <Text className="font-openBold text-sm leading-4 text-red-600">
            *
          </Text>
        ) : null}
        {label && label.length > 0 ? (
          <Text className="font-openBold text-sm leading-4 text-zinc-900">
            {label.toLocaleUpperCase()}
          </Text>
        ) : null}
      </View>
      <View className="relative z-50">
        <DropDownPicker
          multiple={true}
          stickyHeader
          min={0}
          max={5}
          open={open}
          value={selected}
          items={options}
          setOpen={setOpen}
          setValue={setSelected}
          setItems={setSelected}
          ArrowDownIconComponent={() => {
            return (
              <CaretDown size={13} color={colors.gray[500]} weight="fill" />
            );
          }}
          style={{
            zIndex: 50,
            backgroundColor: '#F8F9FA',
            height: 56,
            borderRadius: 8,
            borderWidth: 0,
            paddingHorizontal: 20,
            paddingVertical: 8,
          }}
          ListEmptyComponent={() => {
            return (
              <View className="my-10 flex flex-row items-center justify-center">
                <Text className="font-poppinsSemibold text-base text-neutral-900">
                  Nenhum item encontrado
                </Text>
              </View>
            );
          }}
          maxHeight={1000}
          dropDownContainerStyle={{
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderRadius: 8,
          }}
          containerStyle={{
            width: '100%',
            height: 56,
            borderRadius: 8,
            borderWidth: 0,
          }}
          // TickIconComponent={() => {
          //   return (
          //     <Animated.View
          //       entering={ZoomIn}
          //       exiting={ZoomOut}
          //       className="flex h-8 w-8 items-center justify-center rounded-lg bg-alert-green"
          //     >
          //       <Feather name="check" size={20} color={colors.white} />
          //     </Animated.View>
          //   );
          // }}
          searchTextInputStyle={{
            backgroundColor: '#F8F9FA',
            borderRadius: 8,
            borderWidth: 0,
            height: 56,
            paddingHorizontal: 20,
            paddingVertical: 8,
            margin: 0,
          }}
          searchPlaceholder="Digite para pesquisar"
          searchable={true}
          listMode="MODAL"
          multipleText={`${selected && selected.length} ${
            selected && selected.length === 1
              ? 'exercício selecionado'
              : 'exercícios selecionados'
          }`}
          placeholder="Selecione"
        />
      </View>
    </>
  );
}
