import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

export default function PSandD({
  problemId,
  problemStatement,
  difficulty,
  problemDesc,
  hint,
  constraints,
}) {
  return (
    <div className="bg-gray-50"  >
 
       {/* Problem Description */}
      <div
        className="text-gray-800 mb-6"
        style={{
          whiteSpace: 'pre-wrap', // This ensures the preformatted content (like <code>) and line breaks are rendered
        }}
        dangerouslySetInnerHTML={{ __html: problemDesc || 'No description available.' }}
      />

      {/* Hints Section */}
      {hint && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Hints</h3>
          {constraints &&
            constraints.map((hints, idx) => (
              <div key={idx} className="text-gray-600">
                {hints}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

// PropTypes for validation
PSandD.propTypes = {
  problemId: PropTypes.string.isRequired,
  problemStatement: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  problemDesc: PropTypes.string,
  hint: PropTypes.bool.isRequired,
  constraints: PropTypes.arrayOf(PropTypes.string),
};

PSandD.defaultProps = {
  problemDesc: 'No description available.',
  constraints: [],
};
