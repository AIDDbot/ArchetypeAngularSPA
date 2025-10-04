# Playwright Test Code for User Registration

Here's the complete Playwright test code that captures the user registration flow we just performed:

## Installation
First, install Playwright in your Angular project:

```bash
npm install --save-dev @playwright/test
npx playwright install
```

## Playwright Configuration (playwright.config.ts)
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
  },
});
```

## Test Code (tests/user-registration.spec.ts)
```typescript
import { test, expect } from '@playwright/test';

test.describe('User Registration', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('/');
  });

  test('should successfully register a new user with strong password', async ({ page }) => {
    // Navigate to registration page
    await page.getByRole('link', { name: 'Register' }).click();
    
    // Verify we're on the registration page
    await expect(page).toHaveURL('/user/register');
    await expect(page.getByRole('heading', { name: 'Register your account' })).toBeVisible();
    
    // Fill out the registration form with strong password
    await page.getByRole('textbox', { name: 'Name' }).fill('Alex Rodriguez');
    await page.getByRole('textbox', { name: 'Email' }).fill('alex.rodriguez@secure-email.com');
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('SecurePass123!@#');
    await page.getByRole('textbox', { name: 'Repeat Password' }).fill('SecurePass123!@#');
    
    // Accept terms and conditions using JavaScript to ensure proper form handling
    await page.evaluate(() => {
      const checkbox = document.getElementById('terms') as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        checkbox.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    
    // Verify the register button is enabled
    const registerButton = page.getByRole('button', { name: 'Register' });
    await expect(registerButton).toBeEnabled();
    
    // Submit the registration form
    await registerButton.click();
    
    // Verify successful registration and automatic login
    await expect(page).toHaveURL(/\/user\/alex\.rodriguez@secure-email\.com$/);
    await expect(page.getByRole('heading', { name: 'User' })).toBeVisible();
    await expect(page.getByText('User: alex.rodriguez@secure-email.com')).toBeVisible();
    
    // Verify user data is displayed correctly
    await expect(page.getByText(/Alex Rodriguez/)).toBeVisible();
    await expect(page.getByText(/alex\.rodriguez@secure-email\.com/)).toBeVisible();
    
    // Verify logout button is available
    await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
    
    // Verify navigation updated to show User link
    await expect(page.getByRole('link', { name: 'User' })).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    // Navigate to registration page
    await page.getByRole('link', { name: 'Register' }).click();
    
    // Verify validation errors are shown for empty form
    await expect(page.getByText('Review the form for errors:')).toBeVisible();
    await expect(page.getByText('email')).toBeVisible();
    await expect(page.getByText('name')).toBeVisible();
    await expect(page.getByText('password')).toBeVisible();
    await expect(page.getByText('terms')).toBeVisible();
    
    // Verify register button is disabled
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('should validate password requirements', async ({ page }) => {
    // Navigate to registration page
    await page.getByRole('link', { name: 'Register' }).click();
    
    // Fill form with weak password
    await page.getByRole('textbox', { name: 'Name' }).fill('Test User');
    await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('weak');
    await page.getByRole('textbox', { name: 'Repeat Password' }).fill('weak');
    
    // Check terms
    await page.evaluate(() => {
      const checkbox = document.getElementById('terms') as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        checkbox.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    
    // Verify password validation error
    await expect(page.getByText('Password must have a digit and a letter')).toBeVisible();
    
    // Register button should be disabled due to password validation
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
  });

  test('should reset form when reset button is clicked', async ({ page }) => {
    // Navigate to registration page
    await page.getByRole('link', { name: 'Register' }).click();
    
    // Fill out some form fields
    await page.getByRole('textbox', { name: 'Name' }).fill('Test User');
    await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
    
    // Click reset button
    await page.getByRole('button', { name: 'Reset' }).click();
    
    // Verify form is cleared
    await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'Password', exact: true })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'Repeat Password' })).toHaveValue('');
  });

  test('should navigate to login page from registration', async ({ page }) => {
    // Navigate to registration page
    await page.getByRole('link', { name: 'Register' }).click();
    
    // Click the login link
    await page.getByRole('link', { name: 'Go to login if you already have an account' }).click();
    
    // Verify navigation to login page
    await expect(page).toHaveURL('/user/login');
  });
});
```

## Package.json Scripts
Add these scripts to your package.json:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:report": "playwright show-report"
  }
}
```

## Running the Tests
```bash
# Run all tests
npm run test:e2e

# Run tests in UI mode
npm run test:e2e:ui

# Show test report
npm run test:e2e:report

# Run specific test file
npx playwright test user-registration.spec.ts
```

## Key Features Tested
1. ✅ Successful user registration with strong password
2. ✅ Form validation for empty fields
3. ✅ Password strength validation
4. ✅ Form reset functionality
5. ✅ Navigation between register and login pages
6. ✅ Automatic login after registration
7. ✅ User profile page display

## Test Patterns Used
- **Page Object Model**: Using Playwright's built-in locators
- **Accessibility-First**: Using `getByRole()` and `getByText()`
- **Wait Strategies**: Using `expect()` with automatic waiting
- **Custom JavaScript**: For complex form interactions
- **URL Validation**: Testing navigation flows
- **Visual Verification**: Checking UI state changes