import { getMatches, SuggestionMatchPart } from "../util/match.js";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";

import { Suggestion } from "../models/TimeZoneShort.js";
import { withStyles } from "@mui/styles";

import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { makeStyles } from "../themes/themes.js";

interface TypeaheadProps {
  suggestions: Suggestion[];
  value: string;
  onChange: (value: string) => void;
}

export const Typeahead = (props: TypeaheadProps) => {
  const { classes } = useStyles();
  const renderInput = useCallback(
    (inputProps) => {
      const { value, ref, key, ...other } = inputProps;
      const showError = !valid && touched;
      const errorMessage = showError
        ? "Select value from the list, value can't be empty"
        : "";
      return (
        <TextField
          size="small"
          required={true}
          className={classes.textField}
          value={value}
          inputRef={ref}
          label="Choose timezone"
          placeholder="Type timezone name or offset"
          error={showError}
          helperText={errorMessage}
          InputProps={{
            classes: {
              input: classes.input,
            },
            ...other,
          }}
        />
      );
    },
    [classes],
  );

  const renderSuggestion = useCallback(
    (suggestion: Suggestion, { query, isHighlighted }) => {
      const titleMatches = getMatches(suggestion.title, query);
      const subHeadingMatches = getMatches(suggestion.subheading, query);
      const titleParts = parse(
        suggestion.title,
        titleMatches,
      ) as SuggestionMatchPart[];
      const subHeadingParts = parse(
        suggestion.subheading,
        subHeadingMatches,
      ) as SuggestionMatchPart[];

      return (
        <MenuItem selected={isHighlighted} component="div">
          <div className="d-flex w-100">
            {titleParts.map((part, index) => (
              <span
                key={index}
                style={{ fontWeight: part.highlight ? "bolder" : "inherit" }}
              >
                {part.text}
              </span>
            ))}
            <span className="ml-auto" style={{ fontWeight: "lighter" }}>
              {subHeadingParts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? "bolder" : "inherit" }}
                >
                  {part.text}
                </span>
              ))}
            </span>
          </div>
        </MenuItem>
      );
    },
    [],
  );

  const renderSuggestionsContainer = useCallback((options) => {
    const { containerProps, children } = options;
    const { key, ...rest } = containerProps;
    return (
      <Paper {...rest} square>
        {children}
      </Paper>
    );
  }, []);

  const getSuggestionValue = useCallback((suggestion: Suggestion) => {
    return suggestion.title;
  }, []);

  const handleSuggestionsFetchRequested = useCallback(
    ({ value }) => {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
      let count = 0;

      const result =
        inputLength === 0
          ? []
          : props.suggestions
              .filter((suggestion) => {
                return (
                  suggestion.title.toLowerCase().includes(inputValue) ||
                  suggestion.subheading.toLowerCase().includes(inputValue)
                );
              })
              .slice(0, 100);
      setSuggestions(result);
    },
    [props.suggestions],
  );
  const getTitleById = useCallback(
    (suggestionId: string) => {
      return (
        props.suggestions.find((x) => x.id === suggestionId) || { title: "" }
      ).title;
    },
    [props.suggestions],
  );
  const [value, setValue] = useState(getTitleById(props.value));
  const [suggestions, setSuggestions] = useState(props.suggestions);
  const [valid, setValid] = useState(false);
  const [touched, setTouched] = useState(false);

  const validate = useCallback(
    (newValue: string) => {
      const selectedValue = props.suggestions.find((x) => x.title === newValue);
      if (selectedValue) {
        props.onChange(selectedValue.id);
        return true;
      } else {
        return false;
      }
    },
    [props.suggestions, props.onChange],
  );

  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value);
    }
  }, [props.value]);
  const handleChange = useCallback((event, { newValue }) => {
    setValue(newValue);
    setValid(validate(newValue));
  }, []);

  const onBlur = useCallback(() => {
    setTouched(true);
  }, []);
  const handleSuggestionsClearRequested = useCallback(() => {
    setSuggestions([]);
  }, []);

  return (
    <Autosuggest
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
      }}
      renderInputComponent={renderInput}
      suggestions={suggestions}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      renderSuggestionsContainer={renderSuggestionsContainer}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={{
        // classes,
        value,
        onChange: handleChange,
        onBlur,
      }}
    />
  );
};

const useStyles = makeStyles()((theme) => ({
  container: {
    flexGrow: 1,
    position: "relative",
    minHeight: 68,
  },
  suggestionsContainerOpen: {
    position: "absolute",
    marginTop: theme.spacing(),
    marginBottom: "48px",
    overflowY: "scroll",
    maxHeight: 200,
    zIndex: 10,
    left: 0,
    right: 0,
    bottom: 0,
  },
  suggestion: {
    display: "block",
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  textField: {
    width: "100%",
  },
  input: {},
}));
