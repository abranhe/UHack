import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select, { components } from 'react-select';

const ClickableControl = props => (
  <components.Control
    {...props}
    innerProps={{
      onMouseDown: props.selectProps.onControlMouseDown
    }}
  />
);

ClickableControl.propTypes = {
  selectProps: PropTypes.object.isRequired
};

const markupOptions = [
  { value: 'markdown', label: 'Copy Markdown' },
  { value: 'html', label: 'Copy HTML' },
];

function CopyButton({ onMarkupRequested, isDisabled, colors, placeholder }) {
  const selectRef = useRef();

  const Button = styled(Select)`
    width: 200px;

    margin-left: auto;
    margin-right: auto;

    font-family: 'Lato', sans-serif;
    font-size: 12px;

    .markup-format__control {
      background-image: linear-gradient(
        -180deg,
        ${colors[0]} 0%,
        ${colors[1]} 100%
      );
      border: 1px solid rgba(238, 239, 241, 0.8);
      border-width: 0;
      box-shadow: unset;
      cursor: copy;
    }

    .markup-format__control--is-disabled {
      background: rgba(0, 118, 255, 0.3);
      cursor: none;
    }

    .markup-format__placeholder {
      color: #eeeff1;
    }

    .markup-format__indicator {
      color: rgba(238, 239, 241, 0.81);
      cursor: pointer;
    }

    .markup-format__indicator:hover {
      color: #eeeff1;
    }

    .markup-format__control--is-focused .markup-format__indicator,
    .markup-format__control--is-focused .markup-format__indicator:hover {
      color: #ffffff;
    }

    .markup-format__option {
      text-align: left;
      cursor: copy;
    }
  `;

  async function onControlMouseDown(event) {
    if (onMarkupRequested) {
      await onMarkupRequested('link');
    }

    selectRef.current.blur();
  }

  async function onOptionClick({ value: markupFormat }) {
    if (onMarkupRequested) {
      await onMarkupRequested(markupFormat);
    }
  }

  return (
    <Button
      ref={selectRef}
      blurInputOnSelect
      closeMenuOnScroll
      classNamePrefix='markup-format'
      components={{ Control: ClickableControl }}
      isDisabled={isDisabled}
      isSearchable={false}
      menuPlacement='auto'
      options={markupOptions}
      placeholder={placeholder}
      value=''
      onChange={onOptionClick}
      onControlMouseDown={onControlMouseDown}
    />
  );
}

CopyButton.propTypes = {
  onMarkupRequested: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  colors: PropTypes.array,
  placeholder: PropTypes.string,
};

CopyButton.defaultProps = {
  onMarkupRequested: Function.prototype,
  isDisabled: false,
  colors: [ '#0076ff', '#0076ff' ],
  placeholder: '',
};

export default CopyButton;