import React, { useEffect } from "react"
import { useMoralis } from "react-moralis"

function ManuallyConnectingHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3 ,isWeb3EnableLoading} = useMoralis()
    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (localStorage.getItem("Connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            if (account == null) {
                console.log(`Account changed to ${account}`)
                localStorage.removeItem("Connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()
                        if (typeof window !== "undefined") {
                            localStorage.setItem("Connected", "Injected")
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    )
}

export default ManuallyConnectingHeader
