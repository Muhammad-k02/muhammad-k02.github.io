import PropTypes from 'prop-types';

export const projectPropTypes = {
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  fullDescription: PropTypes.string.isRequired,
  github: PropTypes.string,
  technologies: PropTypes.arrayOf(PropTypes.string)
};

export const backgroundImagePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
  })
]);
