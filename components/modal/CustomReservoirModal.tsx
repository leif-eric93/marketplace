import React, {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
} from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Button, Flex, Text, Loader, Box } from '../reservoirComponents'
import { styled } from '../../stitches.config'
import { Dialog } from '../reservoirComponents/dialog/Dialog'
// import { ProviderOptionsContext } from '../../contexts/ProviderOptionsContext'

const Title = styled(DialogPrimitive.Title, {
  margin: 0,
})

export enum ModalSize {
  MD,
  LG,
}

type Props = {
  title: string
  children: ReactNode
  size?: ModalSize
  onBack?: (() => void) | null
  loading?: boolean
} & Pick<
  ComponentPropsWithoutRef<typeof Dialog>,
  | 'onPointerDownOutside'
  | 'onOpenChange'
  | 'open'
  | 'trigger'
  | 'onFocusCapture'
  >

// const Logo = styled(ReservoirLogoWhiteText, {
//   '& .letter': {
//     fill: '$reservoirLogoColor',
//   },
// })

//@dev - this is a hack to get the bid modal to work with custom properties.
// https://docs.reservoir.tools/docs/buying#custom-buymodal
// CustomReservoirModal is https://github.com/reservoirprotocol/reservoir-kit/blob/main/packages/ui/src/modal/Modal.tsx


// eslint-disable-next-line react/display-name
export const CustomReservoirModal = forwardRef<ElementRef<typeof Dialog>, Props>(
  (
    {
      title,
      children,
      trigger,
      onBack,
      open,
      size = ModalSize.MD,
      onOpenChange,
      loading,
      onPointerDownOutside,
      onFocusCapture,
    },
    forwardedRef
  ) => {
    // const providerOptionsContext = useContext(ProviderOptionsContext)

    return (
      <Dialog
        ref={forwardedRef}
        trigger={trigger}
        open={open}
        onOpenChange={onOpenChange}
        size={size}
        onPointerDownOutside={onPointerDownOutside}
        onFocusCapture={onFocusCapture}
      >
        <Flex
          css={{
            p: 16,
            backgroundColor: '$headerBackground',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopRightRadius: '$borderRadius',
            borderTopLeftRadius: '$borderRadius',
          }}
        >
          <Title css={{ alignItems: 'center', display: 'flex' }}>
            {onBack && (
              <Button
                color="ghost"
                size="none"
                css={{ mr: '$2', color: '$neutralText' }}
                onClick={onBack}
              >
                <FontAwesomeIcon icon={faChevronLeft} width={16} height={16} />
              </Button>
            )}
            <Text style="h6">{title}</Text>
          </Title>
          <DialogPrimitive.Close asChild>
            <Button color="ghost" size="none" css={{ color: '$neutralText' }}>
              <FontAwesomeIcon icon={faClose} width={16} height={16} />
            </Button>
          </DialogPrimitive.Close>
        </Flex>
        {loading && (
          <Loader
            css={{
              minHeight: 242,
              backgroundColor: '$contentBackground',
            }}
          />
        )}
        <Box css={{ maxHeight: '85vh', overflowY: 'auto' }}>{children}</Box>
      </Dialog>
    )
  }
)
