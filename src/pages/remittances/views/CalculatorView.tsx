import { useState } from 'react'
import { CalcBtn } from '@/pages/remittances/components'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setAlertMsg } from '@/store/essentials'
import { chargeRemittance } from '@/store/remittances'
import '@/pages/remittances/views/calculator.css'

export const CalculatorView = () => {
    const { remittances } = useAppSelector(state => state.remittances)
    const dispatch = useAppDispatch()
    const [number, setNumber] = useState('')

    const buildNumber = (txt: string) => {
        if (number.split('').length === 8) return
        if (txt === '0' && number === '0') return
        if (txt === '.' && number.includes('.')) return
        if (txt === '.' && number === '') return setNumber('0.')

        setNumber(number === '0' && txt !== '.' ? txt : `${number}${txt}`)
    }

    const removeLastChar = () => {
        const newNumber = number.slice(0, -1)

        if (newNumber.endsWith('.')) return setNumber(newNumber.slice(0, -1))

        setNumber(newNumber)
    }

    const validateExternalValue = (value: string) => {
        if (!/^[0-9]{0,8}$/.test(value)) return dispatch(setAlertMsg({
            title: 'Espera',
            message: 'Intentas ingresar un "Id" inválido !',
            type: 'warning',
            duration: 1,
        }))

        setNumber(value)
    }

    const startChargeRemittance = () => {
        if (!/^[0-9]{8}$/.test(number)) return dispatch(setAlertMsg({
            title: 'Espera',
            message: 'El "Id" no es válido !',
            type: 'warning',
            duration: 1.8,
        }))

        const remittance = remittances.find(x => x.id === number)

        if (!remittance) return dispatch(setAlertMsg({
            title: 'Error',
            message: `La remesa con el id "${number}" no existe !`,
            type: 'error',
            duration: 1.8,
        }))

        dispatch(chargeRemittance(number))

        dispatch(setAlertMsg({
            title: 'Cobrada',
            message: `La remesa con el id "${number}" ha sido cobrada !`,
            type: 'success',
            duration: 1.8,
        }))

        setNumber('')
    }

    return (
        <div className="calculator-container">
            <h3 className="text-info">Ventanilla <b>Digital</b></h3>
            <hr />
            <h2 className="text-white">Remesas</h2>
            <div className="keyboard-container">
                <div className="input-search">
                    <input
                        placeholder="290034"
                        value={number}
                        onChange={({ target: { value } }) => validateExternalValue(value)}
                    />
                    <label>|**</label>
                </div>
                <div className="row">
                    <div className="col-3-4">
                        <div className="row">
                            <div className="col-1-3">
                                <CalcBtn onClick={() => buildNumber('1')}>1</CalcBtn>
                            </div>
                            <div className="col-1-3">
                                <CalcBtn onClick={() => buildNumber('2')}>2</CalcBtn>
                            </div>
                            <div className="col-1-3">
                                <CalcBtn onClick={() => buildNumber('3')}>3</CalcBtn>
                            </div>
                            <div className="col-1-3">
                                <CalcBtn onClick={() => buildNumber('4')}>4</CalcBtn>
                            </div>
                            <div className="col-1-3">
                                <CalcBtn onClick={() => buildNumber('5')}>5</CalcBtn>
                            </div>
                            <div className="col-1-3">
                                <CalcBtn onClick={() => buildNumber('6')}>6</CalcBtn>
                            </div>
                        </div>
                    </div>
                    <div className="col-1-4">
                        <CalcBtn size={2} direction="vertical" onClick={removeLastChar}>
                            <i className="fa-solid fa-delete-left"></i>
                        </CalcBtn>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3-4">
                        <div className="row">
                            <div className="col-1-3">
                                <CalcBtn onClick={() => buildNumber('7')}>7</CalcBtn>
                            </div>
                            <div className="col-1-3">
                                <CalcBtn onClick={() => buildNumber('8')}>8</CalcBtn>
                            </div>
                            <div className="col-1-3">
                                <CalcBtn onClick={() => buildNumber('9')}>9</CalcBtn>
                            </div>
                            <div className="col-2-3">
                                <CalcBtn size={2} onClick={() => buildNumber('0')}>0</CalcBtn>
                            </div>
                            <div className="col-1-3">
                                <CalcBtn onClick={() => buildNumber('.')}>.</CalcBtn>
                            </div>
                        </div>
                    </div>
                    <div className="col-1-4">
                        <CalcBtn size={2} direction="vertical" style={{ backgroundColor: 'var(--primary)' }} onClick={startChargeRemittance}>
                            <i className="fa-solid fa-arrow-turn-down fa-rotate-90 text-white"></i>
                        </CalcBtn>
                    </div>
                </div>
            </div>
        </div>
    )
}