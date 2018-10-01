import { MenuItem } from "material-ui/Menu";
import Paper from "material-ui/Paper";
import { Theme, withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import * as React from "react";
import * as Autosuggest from "react-autosuggest";

import { Suggestion } from "../models";
import { getMatches, SuggestionMatchPart } from "../util/match";

const match = require("autosuggest-highlight/match");
const parse = require("autosuggest-highlight/parse");

interface TypeaheadProps {
  suggestions: Suggestion[];
  classes: any;
  value: string;
  onChange: (value: string) => void;
}

interface TypeaheadState {
  value: string;
  suggestions: Suggestion[];
  valid: boolean;
  touched: boolean;
}

class TypeaheadImpl extends React.Component<TypeaheadProps, TypeaheadState> {

  constructor(props) {
    super(props);
    const { suggestions } = this.props;
    this.state = {
      suggestions,
      value: this.getTitleById(props.value),
      valid: false,
      touched: false,
    };
  }

  get showError(): boolean {
    return !this.state.valid && this.state.touched;
  }

  get errorMessage(): string {
    return this.showError ? "Select value from the list, value can't be empty" : "";
  }

  getTitleById(suggestionId: string) {
    return (this.props.suggestions.find(x => x.id === suggestionId) || { title: "" }).title;
  }

  validate(newValue: string): boolean {
    const selectedValue = this.props.suggestions.find(x => x.title === newValue);
    if (selectedValue) {
      this.props.onChange(selectedValue.id);
      return true;
    } else {
      return false;
    }
  }

  onBlur() {
    this.setState({ touched: true });
  }

  renderInput(inputProps) {
    const { classes, value, ref, ...other } = inputProps;

    return (
      <TextField
        required={true}
        className={classes.textField}
        value={value}
        inputRef={ref}
        label="Choose timezone"
        placeholder="Type timezone name or offset"
        error={this.showError}
        helperText={this.errorMessage}
        InputProps={{
          classes: {
            input: classes.input,
          },
          ...other,
        }}
      />
    );
  }

  renderSuggestion(suggestion: Suggestion, query, isHighlighted) {
    const titleMatches = getMatches(suggestion.title, query);
    const subHeadingMatches = getMatches(suggestion.subheading, query);
    const titleParts = parse(suggestion.title, titleMatches) as SuggestionMatchPart[];
    const subHeadingParts = parse(suggestion.subheading, subHeadingMatches) as SuggestionMatchPart[];

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div className="d-flex w-100">
          {titleParts.map((part, index) => (
            <span key={index} style={{ fontWeight: part.highlight ? "bolder" : "inherit" }}>
              {part.text}
            </span>
          ))}
          <span className="ml-auto" style={{ fontWeight: "lighter" }}>
            {subHeadingParts.map((part, index) => (
              <span key={index} style={{ fontWeight: part.highlight ? "bolder" : "inherit" }}>
                {part.text}
              </span>
            ))}
          </span>
        </div>
      </MenuItem>
    );
  }

  renderSuggestionsContainer(options) {
    const { containerProps, children } = options;
    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  }

  getSuggestionValue(suggestion: Suggestion) {
    return suggestion.title;
  }

  getSuggestions(suggestions: Suggestion[], value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    const result = inputLength === 0
      ? []
      : suggestions.filter(suggestion => {
        return suggestion.title.toLowerCase().includes(inputValue)
          || suggestion.subheading.toLowerCase().includes(inputValue);
      }).slice(0, 100);
    return result;
  }

  handleSuggestionsFetchRequested(suggestions: Suggestion[], value) {
    this.setState({
      suggestions: this.getSuggestions(suggestions, value),
    });
  };

  handleSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  };

  handleChange(newValue) {
    this.setState({
      value: newValue,
      valid: this.validate(newValue)
    });
  };

  componentWillReceiveProps(nextProps: TypeaheadProps) {
    if (this.props && nextProps) {
      if (this.props.value !== nextProps.value) {
        this.handleChange(this.getTitleById(nextProps.value));
      }
    }
  }

  render() {
    const { classes } = this.props;
    const { suggestions, value } = this.state;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={(inputProps) => this.renderInput(inputProps)}
        suggestions={suggestions}
        onSuggestionsFetchRequested={({ value }) => this.handleSuggestionsFetchRequested(this.props.suggestions, value)}
        onSuggestionsClearRequested={() => this.handleSuggestionsClearRequested()}
        renderSuggestionsContainer={(options) => this.renderSuggestionsContainer(options)}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={(suggestion, { query, isHighlighted }) => this.renderSuggestion(suggestion, query, isHighlighted)}
        inputProps={{
          classes,
          value,
          onChange: (event, { newValue }) => this.handleChange(newValue),
          onBlur: () => this.onBlur(),
        }}
      />
    );
  }
}

const styles = (theme: Theme): any => ({
  container: {
    flexGrow: 1,
    position: "relative",
    minHeight: 68,
  },
  suggestionsContainerOpen: {
    position: "absolute",
    marginTop: theme.spacing.unit,
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
});

export const Typeahead = withStyles(styles)(TypeaheadImpl);

