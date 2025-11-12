'use client';

import React from 'react';

export default function FontTest() {
  return (
    <div className="p-4 bg-gray-100 rounded-lg m-4">
      <h3 className="text-lg font-bold mb-2">Font Test - BBHSansHegarty</h3>
      <p className="text-sm text-gray-600 mb-2">
        This text should be displayed in the BBHSansHegarty font:
      </p>
      <div className="space-y-2">
        <p className="font-krisha text-lg">Krisha Agricultural Assistant</p>
        <p className="font-krisha text-base">Crop Analysis • Weather Forecast • Market Prices</p>
        <p className="font-krisha text-sm">Voice Assistant • Soil Report • Recommendations</p>
      </div>
    </div>
  );
}
