import React, { useState } from "react";
import { canisterId, createActor } from "../../../declarations/token_backend";
import { AuthClient } from "@dfinity/auth-client";

function Faucet({ userPrincipal }) {
	const [isDisabled, setDisabled] = useState(false);
	const [buttonText, setText] = useState("Gimme gimme");

	async function handleClick(event) {
		setDisabled(true);

		const authclient = await AuthClient.create();
		const identity = await authclient.getIdentity();

		const authenticatedCanister = createActor(canisterId, {
			agentOptions: {
				identity,
			},
		});

		await token_backend.payOut();
		const result = await authenticatedCanister.payOut();
		setText(result.toLocaleString());
	}

	return (
		<div className="blue window">
			<h2>
				<span role="img" aria-label="tap emoji">
					🚰
				</span>
				Faucet
			</h2>
			<label>
				Get your free DJonm tokens here! Claim 10,000 DJM Token to your{" "}
				{userPrincipal}.
			</label>
			<p className="trade-buttons">
				<button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
					{buttonText}
				</button>
			</p>
		</div>
	);
}

export default Faucet;
