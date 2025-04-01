import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { createSerializer } from '@emotion/jest';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
expect.addSnapshotSerializer(createSerializer());
