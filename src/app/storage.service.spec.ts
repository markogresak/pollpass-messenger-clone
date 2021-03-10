import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let store: Record<any, any> = {};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);

    store = {};
    const mockLocalStorage: Pick<
      Storage,
      'getItem' | 'setItem' | 'removeItem'
    > = {
      getItem: (key: string): string => {
        return store[key] ?? null;
      },
      setItem: (key: string, value: any): void => {
        store[key] = String(value);
      },
      removeItem: (key: string): void => {
        delete store[key];
      },
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
  });

  it('should store a value and then return it as the original type (e.g. number)', () => {
    const data = {
      key1: 'abc',
      key2: 123,
      key3: true,
    };

    for (const [key, value] of Object.entries(data)) {
      service.set(key, value);
      expect(service.get(key)).toBe(value);
    }
  });

  it('should serialize an object to JSON string', () => {
    const key = 'obj';
    const value = { x: 1, y: 'b', z: true };

    service.set(key, value);
    expect(store[key]).toBe(JSON.stringify(value));
  });

  it('should return a stored object', () => {
    const key = 'obj';
    const value = { x: 1, y: 'b', z: true };

    store[key] = JSON.stringify(value);
    expect(service.get(key)).toEqual(value);
  });

  it('should return null if the value does not exist', () => {
    expect(service.get('some-key')).toBeNull();
  });

  it('should return null if unable to parse the value', () => {
    const key = 'obj';
    const invalidJson = '{x}';

    store[key] = invalidJson;
    expect(service.get(key)).toBeNull();
  });

  it('should remove a stored item', () => {
    const key = 'obj';
    const value = { x: 1, y: 'b', z: true };

    store[key] = JSON.stringify(value);
    expect(store[key]).not.toBeUndefined();
    service.remove(key);
    expect(store[key]).toBeUndefined();
  });
});
