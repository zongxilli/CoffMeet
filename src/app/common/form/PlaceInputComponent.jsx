import React from 'react';
import { useField } from 'formik';
import { FormField, Label, List, Segment } from 'semantic-ui-react';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from 'react-places-autocomplete';

export default function PlaceInputComponent({
	label,
	options,
	...props
}) {
	const [field, meta, helpers] = useField(props);

	function selectHandler(address) {
		geocodeByAddress(address)
			.then((results) => getLatLng(results[0]))
			.then((latLng) => helpers.setValue({ address, latLng }))
			.catch((error) => helpers.setError(error));
	}

	function blurHandler(e) {
		field.onBlur(e);
		if (!field.value.latLng) {
			helpers.setValue({ address: '', latLng: null });
		}
	}

	return (
		<PlacesAutocomplete
			value={field.value['address']}
			onChange={(value) => helpers.setValue({ address: value })}
			onSelect={(value) => selectHandler(value)}
			searchOptions={options}
		>
			{({
				getInputProps,
				suggestions,
				getSuggestionItemProps,
				loading,
			}) => (
				<FormField error={meta.touched && !!meta.error}>
					<input
						{...getInputProps({
							name: field.name,
							onBlur: (e) => blurHandler(e),
							...props,
						})}
					/>
					{meta.touched && meta.error ? (
						<Label basic color='red' pointing>
							{meta.error['address']}
						</Label>
					) : null}

					{suggestions?.length > 0 && (
						<Segment
							loading={loading}
							style={{
								marginTop: 0,
								position: 'absolute',
								zIndex: 1000,
								width: '100%',
							}}
						>
							<List selection>
								{suggestions.map((suggestion) => (
									<List.Item {...getSuggestionItemProps(suggestion)}>
										<List.Header>
											{suggestion.formattedSuggestion.mainText}
										</List.Header>
										<List.Description>
											{suggestion.formattedSuggestion.secondaryText}
										</List.Description>
									</List.Item>
								))}
							</List>
						</Segment>
					)}
				</FormField>
			)}
		</PlacesAutocomplete>
	);
}
